"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogConfig = void 0;
const blog_service_1 = require("./services/blog.service");
exports.blogConfig = {
    providers: [
        blog_service_1.BlogService
    ],
};
