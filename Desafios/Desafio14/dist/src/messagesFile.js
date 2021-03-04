"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageClass = void 0;
const fs = require('fs');
class messageClass {
    constructor(fileName) {
        this.fileName = fileName;
    }
    readMsg() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readFile(this.fileName, 'utf-8');
                return JSON.parse(data);
            }
            catch (error) {
                console.log('Se rompio el readMsg()');
            }
        });
    }
    saveMsg(email, date, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readFile(this.fileName, 'utf-8');
                const messages = JSON.parse(data);
                const newData = [...messages, { email: email, date: date, msg: msg }];
                fs.writeFileSync('./public/messages.txt', JSON.stringify(newData), function (err, file) {
                    if (err)
                        throw err;
                    console.log('Guardado');
                });
            }
            catch (error) {
                console.log('No se guardo');
            }
        });
    }
}
exports.messageClass = messageClass;
