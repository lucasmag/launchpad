import {app} from "@src/index";
import logger from "@src/config/logging";

const port = 3000

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`)
})