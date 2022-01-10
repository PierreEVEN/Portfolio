export const projects = [{
    title: "Moteurs de jeu 3D",
    subtitle: "",
    description: "Moteurs de rendu en temps réel faits maison",
    image: "https://user-images.githubusercontent.com/24438631/136795565-0bfdb609-ef96-44de-9579-f8c0b2a79f83.png",
    link: "GameEngines",
}, {
    title: "Jeux vidéo", subtitle: "", description: "Projets de jeu vidéo", image: "https://camo.githubusercontent.com/878a2bc96873e78d2d3c99e7e170c2365ac27d19f413364c107060ab1972cbd9/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f6d6f35616e793466477a302f302e6a7067", link: "",
}, {
    title: "Application diverse", subtitle: "", description: "Divers", image: "https://github.com/evenp/ILSD/raw/main/Images/ccx02.png?raw=true", link: "",
},];

export const languages = {
    HLSL: {
        name: "HLSL",
    },
    GLSL: {
        name: "GLSL",
    },
    Cpp: {
        name: "C++",
    },
    Java: {
        name: "Java",
    },
    JS: {
        name: "JavaScript",
    },
    C: {
        name: "C",
    },
    Blueprint: {
        name: "Blueprint",
    },
}
export const apis = {
    OpenGL: {
        name: "OpenGL",
    },
    Vulkan: {
        name: "Vulkan",
    },
}
export const libs = {
    spirv_reflect: {
        name: "spirv-reflect",
    },
    imgui: {
        name: "imgui",
    },
    joml: {
        name: "joml",
    },
    imguizmo: {
        name: "imguizmo",
    },
    glfw: {
        name: "glfw",
    },
    glm: {
        name: "glm",
    },
    glslang: {
        name: "glslang",
    },
    lwjgl: {
        name: "lwjgl",
    },
    pngdecoder: {
        name: "pngdecoder",
    },
    assimp: {
        name: "assimp",
    },
    glad: {
        name: "glad",
    },
    stbi: {
        name: "stbi",
    },
};


export const game_engines = [
    {
        title: "Headless Engine",
        languages: [languages.Cpp, languages.HLSL, languages.GLSL],
        graphics: apis.Vulkan,
        description: "",
        image: "https://user-images.githubusercontent.com/24438631/136795565-0bfdb609-ef96-44de-9579-f8c0b2a79f83.png",
        link: "https://github.com/PierreEVEN/HeadlessEngine",
        start: "Septembre 2021",
        duration: "en cours...",
        libs: [libs.glm, libs.glslang, libs.spirv_reflect, libs.imgui, libs.imguizmo],
        features: [
            {
                name: "TestFeature",
                description: "Feature description",
                picture: "",
            }
        ],
        gallery: [
            {
                image: "https://user-images.githubusercontent.com/24438631/136795565-0bfdb609-ef96-44de-9579-f8c0b2a79f83.png",
            },
        ],
    },
    {
        title: "Coffee 3D",
        languages: [languages.Java, languages.GLSL],
        graphics: apis.OpenGL,
        description: "Moteur de jeu en java développé à l'occasion des projets tuteurés de mon 3e semestre à l'IUT Robert Schuman.",
        image: "https://user-images.githubusercontent.com/24438631/111083391-a25cec80-850d-11eb-915d-396abed79d8d.png",
        libs: [libs.lwjgl, libs.joml, libs.pngdecoder, libs.imgui],
        start: "Octobre 2020",
        duration: "2 mois",
        link: "https://github.com/PierreEVEN/Coffee3D",
        gallery: [
            {
                youtube: "https://www.youtube.com/embed/ef-brQbH5FE",
            },
            {
                youtube: "https://www.youtube.com/embed/srNc9CzwyKQ",
            },
            {
                youtube: "https://www.youtube.com/embed/8R6M83ooCxI",
            },
            {
                youtube: "https://www.youtube.com/embed/JiN4Cm1TBZ0",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/111083389-a1c45600-850d-11eb-9c58-bc44b6b861e3.png",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/111083391-a25cec80-850d-11eb-915d-396abed79d8d.png",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/111083392-a2f58300-850d-11eb-942a-61ed79c7bba6.png",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/111083393-a38e1980-850d-11eb-9c8a-e87aed85a054.png",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/111083394-a38e1980-850d-11eb-9c32-261c7a9ac672.png",
            },
        ],
    },
    {
        title: "VkEngine",
        description: "sisi",
        languages: [languages.Cpp, languages.GLSL],
        libs: [libs.assimp],
        graphics: apis.Vulkan,
        image: "https://user-images.githubusercontent.com/24438631/100238685-c7aef600-2f30-11eb-9e6f-488f19a76aa7.png",
        link: "https://github.com/PierreEVEN/VkEngine",
        start: "Juin 2020",
        duration: "3 mois",
        gallery: [
            {
                youtube: "https://www.youtube.com/embed/NY4k38Y09-o",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/100238685-c7aef600-2f30-11eb-9e6f-488f19a76aa7.png",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/100238633-bc5bca80-2f30-11eb-8173-ccb643e4b3c1.png",
            },
            {
                image: "https://user-images.githubusercontent.com/24438631/100238498-90d8e000-2f30-11eb-9c5b-99afe821c7c5.png",
            },
        ],
    },
    {
        title: "GLEngine",
        description: "sisi",
        languages: [languages.Cpp, languages.GLSL],
        graphics: apis.OpenGL,
        image: "https://github.com/PierreEVEN/GLEngine/raw/master/Showcase/Dynamic_thumbnails.png?raw=true",
        link: "https://github.com/PierreEVEN/GLEngine",
        libs: [libs.assimp, libs.glfw, libs.glad, libs.stbi, libs.glm],
        start: "Septembre 2019",
        duration: "4 mois",
        gallery: [
            {
                youtube: "https://www.youtube.com/embed/n23T4ktsU0o",
            },
            {
                youtube: "https://www.youtube.com/embed/9scu9FjyV1Q",
            },
            {
                youtube: "https://www.youtube.com/embed/yvfDptMhhlw",
            },
            {
                image: "https://github.com/PierreEVEN/GLEngine/raw/master/Showcase/DynamicBoundingBoxes.png?raw=true",
            },
            {
                image: "https://github.com/PierreEVEN/GLEngine/raw/master/Showcase/Dynamic_thumbnails.png?raw=true",
            },
            {
                image: "https://github.com/PierreEVEN/GLEngine/raw/master/Showcase/LargeModelLoading.png?raw=true",
            },
            {
                image: "https://github.com/PierreEVEN/GLEngine/raw/master/Showcase/ProceduralLandscape.png?raw=true",
            },
            {
                image: "https://github.com/PierreEVEN/GLEngine/raw/master/Showcase/ProceduralLandscaleAndFoliage.png?raw=true",
            },
        ],
    },
];

export const games = [];