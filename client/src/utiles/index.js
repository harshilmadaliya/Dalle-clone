import { surpriseMePrompts } from "../constance";
import FileSaver from "file-saver"

export const getPrompts = (prompt) =>{
    let randomPromptsIndex = Math.floor(Math.random()* surpriseMePrompts.length)
    let randomPrompts = surpriseMePrompts[randomPromptsIndex] 

    if (randomPrompts === prompt) return getPrompts(prompt);


    return randomPrompts
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
  }