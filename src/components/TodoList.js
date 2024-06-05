import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import { Container, Typography, Button, Grid } from '@mui/material';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem("taskList");
        if (savedTasks) {
            setTaskList(JSON.parse(savedTasks));
        }
    }, []);

    const toggle = () => setModal(!modal);

    const saveTask = (taskObj) => {
        const newTask = { ...taskObj, completed: false };
        const updatedTaskList = [...taskList, newTask];
        updateLocalStorage(updatedTaskList);
        setTaskList(updatedTaskList);
        setModal(false);
    };

    const deleteTask = (index) => {
        const updatedTaskList = taskList.filter((_, idx) => idx !== index);
        updateLocalStorage(updatedTaskList);
        setTaskList(updatedTaskList);
    };

    const updateListArray = (updatedTask, index) => {
        const updatedTaskList = taskList.map((task, idx) => (idx === index ? updatedTask : task));
        updateLocalStorage(updatedTaskList);
        setTaskList(updatedTaskList);
    };

    const toggleComplete = (index) => {
        const updatedTaskList = taskList.map((task, idx) => {
            if (idx === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        updateLocalStorage(updatedTaskList);
        setTaskList(updatedTaskList);
    };

    const updateLocalStorage = (tasks) => {
        try {
            localStorage.setItem("taskList", JSON.stringify(tasks));
        } catch (error) {
            console.error("Error updating localStorage", error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                To-do List
            </Typography>
            <Button variant="contained" color="primary" onClick={toggle} style={{ marginBottom: '20px' }}>
                Create Task
            </Button>
            <Grid container spacing={3}>
                {taskList.map((task, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            taskObj={task}
                            index={index}
                            deleteTask={deleteTask}
                            updateListArray={updateListArray}
                            toggleComplete={toggleComplete}
                        />
                    </Grid>
                ))}
            </Grid>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </Container>
    );
};

export default TodoList;
