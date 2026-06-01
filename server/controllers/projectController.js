import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error retrieving projects' });
  }
};

export const createProject = async (req, res) => {
  const { title, description, techStack, github, live, image } = req.body;

  if (!title || !description || !techStack) {
    return res.status(400).json({ message: 'Title, description, and tech stack are required' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()).filter(Boolean),
      github: github || '',
      live: live || '',
      image: image || ''
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error saving new project' });
  }
};

export const updateProject = async (req, res) => {
  const { title, description, techStack, github, live, image } = req.body;

  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (techStack !== undefined) {
      updateData.techStack = Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (github !== undefined) updateData.github = github;
    if (live !== undefined) updateData.live = live;
    if (image !== undefined) updateData.image = image;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully', deletedProject });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
};
