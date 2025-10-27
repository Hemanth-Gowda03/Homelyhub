import React, { Fragment, useEffect, useState } from 'react'
import "../../css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/User/user-action";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userActions } from '../../store/User/user-slice';

const EditProfile = () => {
    const { user, errors, loading } = useSelector((state) => state.user);
    // FIX 1: Use array [] destructuring and a safe default value
    const [avatarPreview, setAvatarPreview] = useState("https://i.pravatar.cc/150?img3"); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const OriginalUserData = {
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        avatar: user?.avatar?.url || ""
    }

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                form.setFieldValue("avatar", reader.result)
            }
        };
        reader.readAsDataURL(e.target.files[0])
    }

    const form = useForm({
        defaultValues: {
            name: "", phoneNumber: "", avatar: ""
        },
        onSubmit: ({ value }) => {
            const updatedFields = {};
            if (value.name !== OriginalUserData.name) {
                updatedFields.name = value.name
            }
            if (value.phoneNumber !== OriginalUserData.phoneNumber) {
                updatedFields.phoneNumber = value.phoneNumber
            }
            if (value.avatar !== OriginalUserData.avatar) {
                updatedFields.avatar = value.avatar
            }
            if (Object.keys(updatedFields).length === 0) {
                toast("No changes made");
                return;
            }
            dispatch(updateUser(updatedFields));
            navigate("/profile");
            toast.success("Profile Updated")
        }
    });

    // FIX 2: Add useEffect to update avatarPreview when user loads
    useEffect(() => {
        if (user?.avatar?.url) {
            setAvatarPreview(user.avatar.url);
        }
    }, [user]);

    useEffect(() => {
        if (errors && errors.length > 0) {
            toast.error(errors);
            dispatch(userActions.clearErrors()); // <-- FIX 3: Typo (was useActions)
        } else if (user) {
            form.setFieldValue("name", user.name);
            form.setFieldValue("phoneNumber", user.phoneNumber);
            // FIX 4: Add optional chaining to prevent crash
            form.setFieldValue("avatar", user?.avatar?.url || "https://i.pravatar.cc/150?img3");
        }
    }, [user, errors, dispatch, form]); // Added dependencies

    return (
        <Fragment>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5 updatedprofile'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }} encType='multipart/form-data'
                    > <h1 className='mt-2 mb-5'>Update Profile</h1>
                        <form.Field name='name'>
                            {(field) => (
                                <div className="form-group">
                                    <label htmlFor='email_field'>Name</label>
                                    <input
                                        type='text'
                                        id='name_field'
                                        className='form-control'
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />

                                </div>
                            )}
                        </form.Field>

                        <form.Field name='phoneNumber'>
                            {(field) => (
                                <div className="form-group">
                                    <label htmlFor='email_field'>Phone Number</label>
                                    <input
                                        type='Number'
                                        id='email_field'
                                        className='form-control'
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />

                                </div>
                            )}
                        </form.Field>

                        <form.Field name='avatar'>
                            {(field) => (
                                <div className="form-group">
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle'
                                                    alt='avatar Preview' />

                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                        <input
                                        type='file'
                                        name={field.name}
                                        className='custom-file-input'
                                        id='avatarupdate' // <-- ID
                                        accept='image/*'
                                        onChange={onChange}
                                        />
                                        <label className='custom-field-label' htmlFor='avatarupdate'> {/* <-- FIX: Make this match the ID */}
                                        Choose Avatar
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form.Field>
                        <button type='submit' className='update-btn btn-block'>
                            {loading ? "Updating" : "update"}
                        </button>
                    </form>

                </div>

            </div>
        </Fragment>
    )
}

export default EditProfile