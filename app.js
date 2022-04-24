const express = require('express');
const path = require('path');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const fs = require('fs');

// Init
const app = express();
const uploadFolder = path.join(__dirname, 'public', 'files');

// Middlewares
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024, uploadDir: uploadFolder });

  // Basic Configuration
  //   form.multiples = true;
  //   form.maxFileSize = 50 * 1024 * 1024; // 5MB
  //   form.uploadDir = uploadFolder;

  form.parse(req, (err, fields, files) => {
    console.log(fields);
    console.log(files);
    if (err) {
      next(err);
      return;
    }
    const file = files.file;

    // const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, '-'));
    const newpath = '/home/danieldwipaska/Documents/source-code/practices/practice3-file-upload-2/public/files/' + file.originalFilename;

    try {
      //renames the file in the directory
      fs.renameSync(file.filepath, newpath);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   // stores the fileName in the database
    //   const newFile = await File.create({ name: `file/${originalFilename}` });
    // } catch (error) {
    //   res.json({ error });
    // }

    res.send('File diterima');
  });
});

// Listen
app.listen(3000, () => {
  console.log('listening at port 3000');
});
