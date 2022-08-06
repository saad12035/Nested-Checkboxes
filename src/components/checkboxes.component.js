import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function IndeterminateCheckbox(
    {
        option,
        categoryFilteredStates,
        setCategoryFilteredStates,
        handleInnerCategoryCheckStateChanged,
        handleMainCategoryClick
    }
) {

    return (
        categoryFilteredStates.map((item, mainCategoryIndex) => {
            return (
                <>
                    <FormControlLabel
                        label={item.categoryName}
                        style={{backgroundColor: "lightgrey", width: "50vw"}}
                        control={
                            <Checkbox
                                key={mainCategoryIndex}
                                checked={categoryFilteredStates[mainCategoryIndex].subValues.length === categoryFilteredStates[mainCategoryIndex].subValues.filter(main => main.checked).length}
                                indeterminate={(() => {
                                    const filtered = categoryFilteredStates[mainCategoryIndex].subValues.filter(main => main.checked);
                                    return categoryFilteredStates[mainCategoryIndex].subValues.length !== filtered.length && filtered.length > 0
                                })()}
                                onChange={(event, checked) => {
                                    handleMainCategoryClick(checked, mainCategoryIndex)
                                }}
                            />
                        }
                    />
                    {item.subValues.map((innerValue, index) => {
                        return (
                            <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                <FormControlLabel
                                    label={innerValue.name}
                                    control={
                                        <Checkbox
                                            checked={innerValue.checked}
                                            onChange={(event, checked) => {
                                                handleInnerCategoryCheckStateChanged(checked, mainCategoryIndex, index)
                                            }}
                                        />
                                    }
                                />
                            </Box>
                        )
                    })}
                </>
            );
        })
    );
}