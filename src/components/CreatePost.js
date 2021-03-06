import React, { useState } from 'react';
import { Snackbar, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import API from "../API"
import theme from '../styles/theme';
import useAppStyle from '../styles/styles';

/**
 * Improvements:
 * - How about being able to modify posts?
 */

/**
 * The form to fill for a user to post a new post
 * and upload an image.
 * 
 * @param {} props is { stateUser: [ user, setUser ] } 
 */
const CreatePost = (props) => {
    // Style
    const classes = useAppStyle();
    const styleDescriptionField = { width: "100%" };

    // State
    const [ description, setDescription ] = useState("");
    const [ successAlert, setSuccessAlert ] = useState(false);
    const [ errorAlert, setErrorAlert ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ errMsg, setErrMsg ] = useState("");
    const user = props.stateUser[0];

    // Functions and event handlers
    const resetPostList = props.resetPostList;
    const sendPost = (e) => {
        e.preventDefault();
        if(!image || !imageURL) {
            showError("No image to post");
            return;
        }

        const req = new FormData();
        req.append("description", description);
        req.append("author", user._id);
        req.append("imageData", image);

        const config = {
            headers: { Authorization: user.token }
        };

        API.post('posts', req, config).then(
            () => {
                setSuccessAlert(true);
                // clean the form
                setDescription("");
                setImage(null);
                setImageURL(null);
                document.getElementById("inputImage").value = "";
                // and refresh the post list
                resetPostList();
            },
            err => { 
                showError("" + err)
            }
        );
    }
    const uploadImage = (e) => {
        if(e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setImageURL(URL.createObjectURL(e.target.files[0]));
        }
    }
    const showError = (errorMessage) => {
        console.error(errorMessage);
        setErrMsg(errorMessage);
        setErrorAlert(true);
    }

    return (
        <div>
            <form onSubmit={sendPost} className={classes.form}>
                <Button component="label" variant={theme.props.variant} color="secondary" >
                    Upload an image
                    <input id="inputImage" type="file" onChange={uploadImage} style={{display: "none"}} />
                </Button>
                <br />
                <img src={imageURL} alt="" />
                <br />
                <TextField name="description" required label="Description"
                    variant={theme.props.variant} multiline rows="5"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    style={styleDescriptionField} />
                <br />
                <Button type="submit" variant={theme.props.variant} color="primary">
                    Post
                </Button>
            </form>

            <Snackbar open={errorAlert} autoHideDuration={6000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">
                    {errMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={successAlert} autoHideDuration={3000} onClose={() => setSuccessAlert(false)}>
                <Alert severity="success">
                    Posted!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CreatePost;
