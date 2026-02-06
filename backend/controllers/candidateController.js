const Candidate = require("../models/Candidate");
const {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume (PDF)" });
    }

    const resumeUrl = req.file.location;
    const resumeKey = req.file.key;

    const candidateExists = await Candidate.findOne({ email });
    if (candidateExists) {
      return res
        .status(400)
        .json({ message: "Candidate with this email already exists" });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl,
      resumeKey,
    });

    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 });

    const candidatesWithSignedUrls = await Promise.all(
      candidates.map(async (candidate) => {
        let signedUrl = candidate.resumeUrl;
        if (candidate.resumeKey) {
          try {
            const command = new GetObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: candidate.resumeKey,
            });
            signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
          } catch (err) {
            console.error(
              `Error generating signed URL for ${candidate.name}:`,
              err,
            );
          }
        }
        return {
          ...candidate.toObject(),
          resumeUrl: signedUrl,
        };
      }),
    );

    res.json(candidatesWithSignedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const candidate = await Candidate.findById(req.params.id);

    if (candidate) {
      candidate.status = status;
      const updatedCandidate = await candidate.save();
      res.json(updatedCandidate);
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    if (candidate.resumeKey) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: candidate.resumeKey,
        });
        await s3.send(command);
      } catch (err) {
        console.error("Error deleting file from S3:", err);
      }
    }

    await candidate.deleteOne();
    res.json({ message: "Candidate removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  updateCandidateStatus,
  deleteCandidate,
};
