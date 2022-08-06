import React, {useEffect, useState} from 'react';
import {TextfieldComponent} from "../../components/textfield/textfield.component";
import {Field, Form, Formik} from "formik";
import {validate} from "../../utils/form.validation.conditions";
import {Button, Container, Divider, Grid, Typography} from "@mui/material";
import IndeterminateCheckbox from "../../components/checkboxes.component";
import data from "../../utils/api";

function Home() {
    const [categoryFilteredStates, setCategoryFilteredStates] = useState([]);
    const[applicableItems,setApplicableItems]=useState(0);
    const [text, setText] = useState({
        amount: '',
        percentage: '',
    });
    const [isSelected, setIsSelected] = useState('')

    useEffect(() => {
        let transformedArray = [];
        data.forEach((value) => {
            value = {...value, checked: false};
            if (Object.keys(value).includes("category")) {
                const findIndex = transformedArray.findIndex(findValue => findValue.categoryName === value.category.name);
                if (~findIndex) {
                    transformedArray[findIndex].subValues.push(value);
                } else {
                    transformedArray.push({
                        mainCategory: value.category,
                        subValues: [value],
                        categoryName: value.category.name
                    });
                }
            } else {
                const findEmpty = transformedArray.findIndex(findValue => findValue.categoryName === "EMPTY");
                if (~findEmpty) {
                    transformedArray[findEmpty].subValues.push(value);
                } else {
                    transformedArray.push({
                        mainCategory: "EMPTY",
                        subValues: [value],
                        categoryName: "EMPTY"
                    });
                }
            }
        });
        setCategoryFilteredStates(transformedArray);
    }, []);

    function handleSubmit() {
        let arr=[];
        categoryFilteredStates.map((mainCategory)=>(
            mainCategory.subValues.map((e)=>{
                    if(e.checked){
                    arr.push(e.id)
                }
            })
        ))
        console.log(arr);
        console.log("Applied to ",isSelected)
        console.log(text.amount)
        console.log(parseInt(text.percentage)/100)
    }

    let inputHandler = (e) => {
        const input = e.target.value;
        if (input === '') {
            setText({
                amount: '',
                percentage: input
            })
        } else {
            let a = converter.toWords(input)
            setText({
                amount: a,
                percentage: input
            })
        }
    };

    const handleInnerCategoryCheckStateChanged = (checked, mainCategoryId, innerCategoryId) => {
        const values = [...categoryFilteredStates];
        values[mainCategoryId].subValues[innerCategoryId] = {
            ...values[mainCategoryId].subValues[innerCategoryId],
            checked: checked
        };
        setCategoryFilteredStates(values);
    };

    const handleMainCategoryClick = (checked, mainCategoryIndex) => {
        const values = [...categoryFilteredStates];
        values[mainCategoryIndex].subValues = values[mainCategoryIndex].subValues.map(value => {
            return {
                ...value,
                checked: checked
            }
        });
        setCategoryFilteredStates(values);
    };

    useEffect(()=>{
        let arr=[];
        categoryFilteredStates.map((mainCategory)=>(
            mainCategory.subValues.map((e)=>{
                if(e.checked){
                    arr.push(e.id)
                }
            })
        ))
        setApplicableItems(arr.length);
    },[categoryFilteredStates]);

    useEffect(() => {
        if (isSelected === "All") {
            const newArray = categoryFilteredStates.map(mainCategoryItem => {
                return {
                    ...mainCategoryItem,
                    subValues: mainCategoryItem.subValues.map(innerItem => {
                        return {
                            ...innerItem,
                            checked: true
                        };
                    })
                }
            });
            setCategoryFilteredStates(newArray);
        }
        if (isSelected === "Some") {
            const newArray = categoryFilteredStates.map(mainCategoryItem => {
                return {
                    ...mainCategoryItem,
                    subValues: mainCategoryItem.subValues.map(innerItem => {
                        return {
                            ...innerItem,
                            checked: false
                        };
                    })
                }
            });
            setCategoryFilteredStates(newArray);
        }
    }, [isSelected]);



    var converter = require('number-to-words');
    return (
        <Container style={{marginTop: "5%"}} maxWidth="md">
            <Typography variant="h4">Add Tax</Typography>
            <Formik
                initialValues={{
                    amount: text.amount,
                    percentage: text.percentage,
                }}
                validationSchema={validate}
                onSubmit={handleSubmit}
            >
                {({values}) => (
                    <Form>
                        <Grid container mb={5} mt={2} spacing={1}>
                            <Grid item xl={4}>
                                <TextfieldComponent disabled={true} placeholder={text.amount} label="Amount" name="amount"/>
                            </Grid>
                            <Grid item xl={4}>
                                <TextfieldComponent onKeyUp={inputHandler} label="Percentage" name="percentage"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xl={12}>
                                <label>
                                    <Field type="radio" name="picked" value="All" onClick={(e) => {
                                        setIsSelected(e.target.value)
                                    }}/>
                                    Apply to all items in collection
                                </label>
                            </Grid>
                            <Grid item xl={12}>
                                <label>
                                    <Field type="radio" name="picked" value="Some" onClick={(e) => {
                                        setIsSelected(e.target.value)
                                    }}/>
                                    Apply to specific items
                                </label>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop: 30, marginBottom: 30}}/>
                        <Grid container spacing={1}>
                            <Grid item xl={4}>
                                <TextfieldComponent onKeyUp={inputHandler} placeholder="Search" label="search" name="search"/>
                            </Grid>
                        </Grid>
                        <Grid container mt={4} spacing={1}>
                            <Grid item xl={12}>
                                <IndeterminateCheckbox
                                    handleInnerCategoryCheckStateChanged={handleInnerCategoryCheckStateChanged}
                                    categoryFilteredStates={categoryFilteredStates}
                                    setCategoryFilteredStates={setCategoryFilteredStates}
                                    option={isSelected ? "All" : "Some"}
                                    handleMainCategoryClick={handleMainCategoryClick}
                                />
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop: 30, marginBottom: 30}}/>
                        <Grid container mb={5} spacing={1}>
                            <Grid item xl={8}/>
                            <Grid item xl={4}>
                                <Button
                                    type="submit"
                                    style={{
                                    textTransform: "capitalize",
                                    backgroundColor: "orangered",
                                    color: "white",
                                    padding: 10,
                                    fontSize: 16
                                }}>Apply tax to {applicableItems} items</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default Home;