import React from 'react';
import EditTask from '../modals/EditTask';
import { Card as MuiCard, CardContent, CardActions, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import PropTypes from 'prop-types';

const Card = ({ taskObj, index, deleteTask, updateListArray, toggleComplete }) => {
    const [modal, setModal] = React.useState(false);

    const categoryColors = {
        Work: { primaryColor: "#FFD700", secondaryColor: "#FFFACD" },
        Personal: { primaryColor: "#FF4500", secondaryColor: "#FFDEAD" },
        Shopping: { primaryColor: "#32CD32", secondaryColor: "#98FB98" },
        Study: { primaryColor: "#8A2BE2", secondaryColor: "#DDA0DD" },
        Others: { primaryColor: "#1E90FF", secondaryColor: "#ADD8E6" },
        Default: { primaryColor: "#D3D3D3", secondaryColor: "#F5F5F5" }
    };

    const getCategoryColors = (category) => {
        return categoryColors[category] || categoryColors.Default;
    };

    const { primaryColor, secondaryColor } = getCategoryColors(taskObj.Category);

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = () => {
        toggleComplete(index);
    };

    return (
        <MuiCard style={{ borderTop: `5px solid ${primaryColor}`, marginBottom: '20px', opacity: taskObj.completed ? 0.5 : 1 }}>
            <CardContent style={{ backgroundColor: secondaryColor }}>
                <FormControlLabel
                    control={
                        <Checkbox checked={taskObj.completed} onChange={handleCheckboxChange} color="primary" />
                    }
                    label={<Typography variant="h5" component="div" style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
                        {taskObj.Name}
                    </Typography>}
                />
                <Typography variant="body2" color="textSecondary" style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
                    {taskObj.Description}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={toggle}
                    style={{ backgroundColor: primaryColor, color: '#fff' }}
                    disabled={taskObj.completed}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                    style={{ backgroundColor: primaryColor, color: '#fff' }}
                >
                    Delete
                </Button>
            </CardActions>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

Card.propTypes = {
    taskObj: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateListArray: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired,
};

export default Card;
