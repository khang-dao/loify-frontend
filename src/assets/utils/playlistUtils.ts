import axios from "axios"


// NOTE: This is duplicated code from LoifyView (preferred to delete from LoifyView and keep here)
async function deleteAllPlaylists() {
    const url = "http://localhost:8080/api/v1/me/playlists/loify"
    await axios.delete(url, { withCredentials: true })
}