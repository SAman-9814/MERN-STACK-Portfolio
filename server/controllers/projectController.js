import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ isPinned: -1, order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error retrieving projects' });
  }
};

export const createProject = async (req, res) => {
  const { title, description, techStack, github, live, image, isPinned } = req.body;

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
      image: image || '',
      isPinned: isPinned === true || isPinned === 'true'
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error saving new project' });
  }
};

export const updateProject = async (req, res) => {
  const { title, description, techStack, github, live, image, isPinned } = req.body;

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
    if (isPinned !== undefined) updateData.isPinned = isPinned === true || isPinned === 'true';

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

export const togglePinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.isPinned = !project.isPinned;
    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Error toggling pin:', error);
    res.status(500).json({ message: 'Error toggling pin status' });
  }
};

export const reorderProjects = async (req, res) => {
  const { projects } = req.body;
  if (!Array.isArray(projects)) {
    return res.status(400).json({ message: 'Projects array is required' });
  }

  try {
    // Perform bulk write for efficiency
    const bulkOps = projects.map((p) => ({
      updateOne: {
        filter: { _id: p._id },
        update: { order: p.order }
      }
    }));

    await Project.bulkWrite(bulkOps);
    res.json({ message: 'Projects reordered successfully' });
  } catch (error) {
    console.error('Error reordering projects:', error);
    res.status(500).json({ message: 'Error updating project order' });
  }
};
