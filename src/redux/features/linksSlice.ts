"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { userLink } from "../../../lib/types";


const initialState: {links: userLink[]} = {
  links: [
    // { id: nanoid(), plat: "github", link: "github.com" },
    // { id: nanoid(), plat: "dev.to", link: "devto.com" },
  ],
};

export const links = createSlice({
  name: "userLinks",
  initialState,
  reducers: {
    updateLinks: (state, action: PayloadAction<userLink>) => {
      state.links = [action.payload, ...state.links];
    },
    updateLink: (state, action: PayloadAction<userLink[]>) => {
      state.links = action.payload
    }
  },
});

export const { updateLinks, updateLink } = links.actions;
export default links.reducer;
