const users = [
  {
    id: "1",
    name: 'Taylor Swift'
  }
]

const projects = [
  {
    id: "1",
    user_id: "1",
    name: 'Style Stash',
    logo_url: "",
    logo_font: "",
    saved: false,
    description: "A closet organization app that allows users to upload images of their wardrobe and plan outfits.",
    tagline: "Organize your wardobe",
    technologies: "react, typescript",
    collaborators: 2,
    timeline: "months",
    timeline_int: 2
  }
]

const features = [
  {
    id: "1",
    project_id: "1",
    description: "Uploading pictures from desktop or mobile"
  },
  {
    id: "2",
    project_id: "1",
    description: "Add pieces from closet to outfits"
  },
  {
    id: "3",
    project_id: "1",
    description: "User login and demo login"
  },
  {
    id: "4",
    project_id: "1",
    description: "Homepage with randomized outfit photo"
  },
  {
    id: "5",
    project_id: "1",
    description: "Edit outfits"
  }
]

const colors = [
  {
    id: "1",
    hex_code: "#f7f2eb",
    project_id: "1"
  },
  {
    id: "2",
    hex_code: "#fadcd1",
    project_id: "1"
  },
  {
    id: "3",
    hex_code: "#debdac",
    project_id: "1"
  },
  {
    id: "4",
    hex_code: "#eccdc1",
    project_id: "1"
  },
  {
    id: "5",
    hex_code: "#ffffff",
    project_id: "1"
  },
  {
    id: "6",
    hex_code: "#000000",
    project_id: "1"
  }
]

const steps = [
  {
    id: "1",
    project_id: "1",
    description: "Initialize create react app and GitHub repo"
  },
  {
    id: "2",
    project_id: "1",
    description: "Create a backend repo in node.js"
  },
  {
    id: "3",
    project_id: "1",
    description: "Set up front end to display user's photos"
  },
  {
    id: "4",
    project_id: "1",
    description: "Create a form for user to upload photos"
  },
  {
    id: "5",
    project_id: "1",
    description: "Create a closet page to display user's clothing pieces"
  }
]

const userInteractions = [
  {
    id: "1",
    project_id: "1",
    description: "User will be able to log in with credentials or log in with a demo profile"
  },
  {
    id: "2",
    project_id: "1",
    description: "User will be able to see randomized outfit on homepage"
  },
  {
    id: "3",
    project_id: "1",
    description: "User will be able to use nav bar to navigate to closet and outifts"
  },
  {
    id: "4",
    project_id: "1",
    description: "User will be able to upload images from their wardrobe to their vitrual closet"
  },
  {
    id: "5",
    project_id: "1",
    description: "User will be able to create outfits with the images they've uploaded."
  }
]

module.exports = {users, features, projects, userInteractions, colors, steps}