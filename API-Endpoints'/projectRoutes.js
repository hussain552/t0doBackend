import express from 'express';
import { Project } from "../models/project.js";
import { SubToDo } from "../models/subtodos.js";

const router = express.Router();

// Create a new project
router.post('/projects', async (req, res) => {
  try {
    const { title } = req.body;
    const newProject = new Project({ title });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: 'Error creating project' });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('subToDos');
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching projects' });
  }
});

// Update a project title
router.put('/projects/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: 'Error updating project' });
  }
});

// Delete a project
router.delete('/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting project' });
  }
});

// Create a new sub-task for a project
router.post('/subtasks', async (req, res) => {
  try {
    const { projectId, title } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const newSubToDo = new SubToDo({ projectId, title });
    await newSubToDo.save();

    project.subToDos.push(newSubToDo);
    await project.save();

    res.status(201).json(newSubToDo);
  } catch (error) {
    res.status(400).json({ error: 'Error creating sub-task' });
  }
});

// Update a sub-task
router.put('/subtasks/:id', async (req, res) => {
  try {
    const { title, completed, dueDate } = req.body;
    const subToDo = await SubToDo.findByIdAndUpdate(
      req.params.id,
      { title, completed, dueDate, updatedAt: Date.now() },
      { new: true }
    );
    if (!subToDo) return res.status(404).json({ error: 'Sub-task not found' });
    res.status(200).json(subToDo);
  } catch (error) {
    res.status(400).json({ error: 'Error updating sub-task' });
  }
});

// Delete a sub-task
router.delete('/subtasks/:id', async (req, res) => {
  try {
    const subToDo = await SubToDo.findByIdAndDelete(req.params.id);
    if (!subToDo) return res.status(404).json({ error: 'Sub-task not found' });
    res.status(200).json({ message: 'Sub-task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting sub-task' });
  }
});

export default router;
