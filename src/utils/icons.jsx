// Central icon registry. Components reference icons by a stable string key
// (stored in src/constants) and this module resolves the key to a verified
// react-icons component. Every export below was confirmed present in the
// installed react-icons@5.6.
import {
    SiPython, SiDjango, SiFastapi, SiCelery, SiPytest, SiJest, SiReact,
    SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiHtml5, SiCss,
    SiTailwindcss, SiBootstrap, SiMui, SiPostgresql, SiSqlite, SiMongodb,
    SiMysql, SiRedis, SiNumpy, SiPandas, SiOpencv, SiHuggingface, SiAnthropic,
    SiOpenai, SiGooglegemini, SiLangchain, SiStripe, SiRazorpay, SiGooglemaps,
    SiSwagger, SiShopify, SiMeta, SiQuickbooks, SiGoogleads, SiPaytm, SiDocker,
    SiKubernetes, SiGit, SiGithub, SiGooglecloud, SiPostman, SiRailway,
    SiPycharm, SiWebstorm, SiDatadog, SiVercel, SiLinux, SiChartdotjs,
    SiX, SiWhatsapp, SiHackerrank,
} from "react-icons/si"
import {
    TbApi, TbDatabase, TbRobot, TbCloudRain, TbChartHistogram, TbBrandAws,
    TbBrandVscode, TbMail, TbMessageDots,
} from "react-icons/tb"
import { FaLinkedin } from "react-icons/fa6"

const ICON_MAP = {
    // Languages & frameworks
    python: SiPython,
    django: SiDjango,
    fastapi: SiFastapi,
    celery: SiCelery,
    restapi: TbApi,
    pytest: SiPytest,
    jest: SiJest,
    react: SiReact,
    nextjs: SiNextdotjs,
    typescript: SiTypescript,
    javascript: SiJavascript,
    nodejs: SiNodedotjs,
    html5: SiHtml5,
    css3: SiCss,
    tailwind: SiTailwindcss,
    bootstrap: SiBootstrap,
    mui: SiMui,
    // Databases
    postgresql: SiPostgresql,
    sql: TbDatabase,
    sqlite: SiSqlite,
    mongodb: SiMongodb,
    mysql: SiMysql,
    redis: SiRedis,
    rdbms: TbDatabase,
    // AI & Data
    numpy: SiNumpy,
    pandas: SiPandas,
    matplotlib: TbChartHistogram,
    chartjs: SiChartdotjs,
    opencv: SiOpencv,
    huggingface: SiHuggingface,
    anthropic: SiAnthropic,
    openai: SiOpenai,
    gemini: SiGooglegemini,
    langchain: SiLangchain,
    // Integrations
    stripe: SiStripe,
    razorpay: SiRazorpay,
    googlemaps: SiGooglemaps,
    swagger: SiSwagger,
    openrouter: TbRobot,
    shopify: SiShopify,
    meta: SiMeta,
    quickbooks: SiQuickbooks,
    weather: TbCloudRain,
    googleads: SiGoogleads,
    paytm: SiPaytm,
    // Tools & DevOps
    docker: SiDocker,
    kubernetes: SiKubernetes,
    git: SiGit,
    github: SiGithub,
    aws: TbBrandAws,
    gcp: SiGooglecloud,
    postman: SiPostman,
    railway: SiRailway,
    vscode: TbBrandVscode,
    pycharm: SiPycharm,
    webstorm: SiWebstorm,
    datadog: SiDatadog,
    vercel: SiVercel,
    linux: SiLinux,
    // Social / contact (github key already defined above)
    x: SiX,
    linkedin: FaLinkedin,
    hackerrank: SiHackerrank,
    whatsapp: SiWhatsapp,
    email: TbMail,
    feedback: TbMessageDots,
}

// Renders the icon for a key. Falls back to a small bullet so a missing key
// never breaks the build or layout.
export const Icon = ({ name, className = "" }) => {
    const Cmp = ICON_MAP[name]
    if (!Cmp) return <span className={className} aria-hidden="true">•</span>
    return <Cmp className={className} aria-hidden="true" />
}

export default Icon
