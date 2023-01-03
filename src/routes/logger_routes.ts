import express, { Router } from "express";
import { filter, getLogs, postLog } from "../controllers/logger_controller";
import { loggerSchema } from "../schema/validation-schema";
import { validateRequestBody } from "../middleware/val-error";
import { methodNotFound } from "../middleware/errorHandler";

const router: Router = express.Router();

router.get('/log', getLogs);
router.post('/log', loggerSchema, validateRequestBody, postLog).all('/log',methodNotFound);

router.post('/filter', filter);

router.get('/get_data');

module.exports = router;


export default router;