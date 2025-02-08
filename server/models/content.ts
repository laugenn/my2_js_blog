import mongoose from "mongoose";

export interface ContentModelInterface {
  _id: string;
  title: string;
  contentType: string;
  uploadFile?: string;
  uploadFileName?: string;
  uploadFileMineType?: string;
  comment: string;
}

const schema = new mongoose.Schema<ContentModelInterface>(
  {
    title: {
      type: String,
      required: true,
      max: 20,
    },
    contentType: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    uploadFile: {
      type: String,
      required: false,
    },
    uploadFileName: {
      type: String,
      required: false,
    },
    uploadFileMineType: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: true,
      max: 100,
    },
  },
  { timestamps: true },
);

export const ContentsModel = mongoose.model<ContentModelInterface>(
  "Contents",
  schema,
);
