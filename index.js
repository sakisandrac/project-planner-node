const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3003;
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.locals = { title: 'Project Planner API' }
require('dotenv').config();
const fetch = require("node-fetch");
const { v4: uuidv4 } = require('uuid');

//MIDDLEWARE
app.use(cors());
app.use(express.json());

// GET ENDPOINT
app.get('/api/v1/data/:userID', async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
});

app.get('/api/v1/data/:userID/:projectID', async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
});

// POST ENDPOINT
app.post('/api/v1/data/:userID', async (req, res) => {
  const { type, technologies, time, collaborators } = req.body;

  const getChatGPTProject = async () => {

    const reqBody =
    {
      "model": "gpt-3.5-turbo-16k",
      "messages": [
        {
          "role": "user",
          "content": `Create a plan for a ${type} application using ${technologies}. I have ${time} to build this application. Include additional feature ideas that the application could have. There will be ${collaborators} people working on this project.`,
          "role": "system",
          "content": "In this plan, please include a name for the application, a schedule for project completion, a plan for how the users would interact with the application, and provide an example interaction. Include a color palette with 6 colors for this app. Provide your new response in JSON format with the following Keys: ProjectName, Description, Steps, Features, Interactions, ColorPalette, and Tagline. Tagline should be a five word summary of the project description. Steps, Features, Interaction and ColorPalette values should come back as an array. Any value inside of an array should not be numbered."
        }
      ]
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NODE_OPEN_AI_KEY}`,
        'organization': 'org-CJUIDmy91NGowrKIalGhRw2U'
      },
      body: JSON.stringify(reqBody)
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions)

    if (response.statusText !== 'OK') {
      

      throw new Error(`Error ${response.status} - Please try again!`);
    }

    return response.json();
  };


  try {
    const project = await getChatGPTProject()
    const parsed = JSON.parse(project.choices[0].message.content)
    const projectID = uuidv4()

    const mainProject = await database('project').insert({
      id: projectID,
      description: parsed.Description,
      tagline: parsed.Tagline,
      user_id: "1",
      logo_font: "",
      logo_url: "",
      saved: false,
      name: parsed.ProjectName,
      technologies,
      timeline: time.split(' ')[1],
      timeline_int: time.split(' ')[0]
    }).returning("*")

    const allSteps = await Promise.all(parsed.Steps.map(async (step) => {
      return await database('step').insert({ id: uuidv4(), project_id: projectID, description: step }).returning('*')
    }))

    const allFeatures = await Promise.all(parsed.Features.map(async (feature) => {
      return await database('feature').insert({ id: uuidv4(), project_id: projectID, description: feature }).returning('*')
    }))

    const allInteractions = await Promise.all(parsed.Interactions.map(async (interaction) => {
      return await database('user_interaction').insert({ id: uuidv4(), project_id: projectID, description: interaction }).returning('*')
    }))

    const allColors= await Promise.all(parsed.ColorPalette.map(async (color) => {
      return await database('color').insert({id: uuidv4(), project_id: projectID, hex_code: color}).returning('*')
    }))

    const newObject = {
      id: projectID,
      type: "project",
      attributes: {
        steps: allSteps.flat().map(step => step.description),
        features: allFeatures.flat().map(step => step.description),
        interactions: allInteractions.flat().map(step => step.description),
        colors: allColors.flat().map(step => step.hex_code),
        name: mainProject[0].name,
        description: mainProject[0].description,
        tagline: mainProject[0].tagline,
        technologies: mainProject[0].technologies,
        timeline: mainProject[0].timeline,
        timeline_int:mainProject[0].timeline_int,
        user_id: mainProject[0].user_id,
        logo_font: mainProject[0].logo_font,
        logo_url: mainProject[0].logo_url,
        saved: mainProject[0].saved,
      }
    }

    res.status(201).json({ data: newObject });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

// PATCH ENDPOINT
app.patch('/api/v1/data/:userID/:projectID', async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
});


// PUT ENDPOINT
app.put('/api/v1/data/:userID/:projectID', async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
});

// DELETE ENDPOINT
app.delete('/api/v1/data/:userID/:projectID', async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
});

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});