import { app } from "./app.js";
import { connectMongoDB } from "./utility/connectMogoDB.js";

const PORT = process.env.PORT;

connectMongoDB();
app.listen(PORT, () => console.log("Server running on PORT : ", PORT));
