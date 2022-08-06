import React from 'react';
import { ErrorMessage, useField } from 'formik';
import './textfield.component.css';
import PercentIcon from '@mui/icons-material/Percent';
import SearchIcon from '@mui/icons-material/Search';

export const TextfieldComponent = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="fields mb-2" >
            <div className="textfield-container">
                {(props.placeholder==='Search')?
                    <SearchIcon style={{alignContent:"center",marginTop:6,outline:0}}/>:null
                }
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
                placeholder={props.placeholder}
            />
                {(label==='Percentage')?
                    <PercentIcon style={{alignContent:"center",marginTop:6}}/>:null
                }
            </div>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}