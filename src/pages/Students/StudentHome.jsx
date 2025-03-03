import { useOutletContext } from "react-router-dom";

const StudentHome = ()=>{
    const data = useOutletContext();
    console.group(data);
    return(
        <section>
            {data.name}
        </section>
    )
}

export default StudentHome;