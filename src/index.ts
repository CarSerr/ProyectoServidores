import express,{json, Request,Response} from 'express';
import { envs } from './config/envs';
import { dbConnection } from './db/init';
import { Tarea } from './db/models/tarea.model';

const app = express();
app.use(express.json());
dbConnection();

app.get("/tareas",async (req:Request,res:Response) => {
    try {
        const tareas = await Tarea.findAll();
        res.json(tareas);
    } catch(error) {
        console.error(`Error: ${error}`);
    }
});

app.get("/tareas/:id",async (req:Request,res:Response) : Promise<any> => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        return res.json(tarea);
    } catch (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ message: 'Error al obtener la tarea' });
    }
});

app.post("/tareaNueva",async (req:Request,res:Response) : Promise<any> => {
    try {
        const { title, description, completed } = req.body;
        const newTarea = await Tarea.create({
            title: title,
            description: description,
            completed: completed
        });
        return res.json(newTarea);
    } catch(error) {
        console.error(`Error: ${error}`);
    }
});

app.put("/tareas/:id",async (req:Request,res:Response) : Promise<any> => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        tarea.title = title;
        tarea.description = description;
        tarea.completed = completed;

        await tarea.save();
        return res.json(tarea);
    } catch (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});

app.delete("/tareas/:id",async (req:Request,res:Response) : Promise<any> => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        await tarea.destroy();
        return res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en el puero 3000");
});