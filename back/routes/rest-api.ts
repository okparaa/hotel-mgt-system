import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { eq } from "drizzle-orm";
import { users } from "../db/schemas";
import throwError, { ErrorTypes } from "../helpers/errors";
import { getKey } from "../helpers";
import https from "https";
import { finished } from "stream";

//const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads")); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    const mimes = file.mimetype.match(/\w+\/(\w+)/);
    if (!mimes || mimes.length < 2) {
      throw new Error("unknown file mtype");
    }
    const { model } = req.body;
    const mime = mimes[1];
    cb(null, model + "_" + getKey() + "_" + getKey() + "." + mime);
  },
});

const upload = multer({ storage: storage });
const restApi = express.Router();
restApi.post("/upld", upload.single("file"), async (req, res) => {
  const { id } = req.body;
  try {
    await req.context.db
      .update(users)
      .set({ photoUrl: req.file?.filename })
      .where(eq(users.id, id));
  } catch (error) {
    throwError("could not save photo", ErrorTypes.DATABASE_UPDATE_ERROR, error);
  }
  res.json({ status: "ok", filename: req.file?.filename });
});

restApi.get("/img/:path", (req, res) => {
  const name = req.params.path;
  console.log(
    "restApi.download: started",
    req.params,
    __dirname,
    path.join(__dirname, "uploads", name)
  );

  const file = fs.createReadStream(path.join(__dirname, "uploads", name));
  finished(file, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file read finished");
    }
  });
  res.setHeader("Content-Disposition", 'attachment: filename="' + name + '"');

  file.pipe(res);
});

restApi.post("/pay", async (req, res) => {
  try {
    const params = JSON.stringify({
      email: req.body.username,
      amount: req.body.amount * 100,
    });
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_PUBLIC_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const clientReq = https
      .request(options, (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => {
          data += chunk;
        });
        apiRes.on("end", () => {
          console.log(JSON.parse(data));
          return res.status(200).json(data);
        });
      })
      .on("error", (error) => {
        console.error(error);
      });
    clientReq.write(params);
    clientReq.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

restApi.post("/vfy", (req, res) => {
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/transaction/verify/${req.body.ref}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_PUBLIC_KEY}`,
    },
  };

  https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });
});
export default restApi;
