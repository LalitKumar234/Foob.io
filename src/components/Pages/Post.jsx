import { Routes, Route, useParams } from "react-router-dom";

const Post = () => {
    let param = useParams();
    console.log(param)
    return <h1>Now showing post {param.id}</h1>;
}

export default Post