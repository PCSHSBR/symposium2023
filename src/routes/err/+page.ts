import { error, fail } from "@sveltejs/kit"
export const load = async ()=>{
    throw error(404,{
        message: "jassdj"
    })
}