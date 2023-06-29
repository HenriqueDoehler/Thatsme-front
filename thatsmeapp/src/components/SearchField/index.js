import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

export default function SearchField({ setSearchField }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <Grid
      container
      mt={2}
      justifyContent='center'
      sx={{
        "& .MuiPaper-root": {
          color: "white",
        },
      }}>
      <Paper
        component='form'
        sx={{
          padding: "8px 8px 8px 24px",
          display: "flex",
          alignItems: "center",
          width: 300,
          borderRadius: "90px",
          height: "52px",
          opacity: 0.7,
          backgroundColor: "rgba(239, 239, 255, 0.3)",
          border: isFocused ? "1px solid white" : "1px solid transparent",
          transition: "border 0.3s",
          "@media (max-width: 400px)": { width: "250px" },
        }}>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: "white",
          }}
          placeholder='Buscar'
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <IconButton
          type='button'
          sx={{
            p: "10px",
            color: "white",
          }}
          aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}
