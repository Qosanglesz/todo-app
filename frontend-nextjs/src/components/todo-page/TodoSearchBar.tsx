import { Input } from "@/components/ui/input"
import React, {useEffect} from "react";

export default function TodoSearchBar() {
    const [search, setSearch] = React.useState("")
    useEffect(() => {
        console.log(search)
    },[search])
    return (
        <div>
            <Input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
        </div>
    )
}