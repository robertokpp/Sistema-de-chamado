import "dotenv/config";
import { app } from "@/app.js";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na port ${PORT}`);
});
