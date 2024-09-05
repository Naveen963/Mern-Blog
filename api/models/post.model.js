import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://325b057e.isolation.zscaler.com/profile/1233fc6e-6618-4022-a03b-96afce7da312/zia-session/?tenant=462f064b6b51&region=bom&controls_id=114c11df-a851-4055-ac44-358fbd5890e4&user=fd3ce774bae6f97c33b4320709dd11293a7ec14e5a0b3a751ecaff0791900d10&original_url=https%3A%2F%2Fwww.hostinger.com%2Ftutorials%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F09%2Fhow-to-write-a-blog-post-1536x674.webp&key=sh-1&hmac=4fc970c69db473d2608cd8dddecf4aa270987e36dc52d30ad53b1466e5ceff18",
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
