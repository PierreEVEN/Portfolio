// src/components/Projects.js

import React from "react";
import {game_engines} from "../../data";

export default function GameEngines() {
    return (
        <section id="GameEngine" className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-10 mx-auto lg:px-40">
                <div className="flex flex-col w-full mb-20 text-center ">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
                        Moteurs de jeu 3D
                    </h1>
                </div>
                <div className="flex flex-wrap -m-4">
                    {game_engines.map((project) => (
                        <div className="flex flex-col w-full mb-20">
                            <hr/>
                            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white text-center">
                                <a href={project.link}
                                   className=" focus:outline-none hover:bg-gray-700 hover:text-white">
                                    {project.title}
                                </a>
                            </h1>
                            <div>
                                <p className="mt-1 text-center">
                                    {project.description}
                                </p>
                            </div>
                            <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
                                <div className="lg:w-1/2 ">
                                    <img
                                        alt="gallery"
                                        className=" inset-0 object-cover object-center"
                                        src={project.image}
                                    />
                                </div>
                                <div className=" px-6 mt-4  ">
                                    <p className="mt-1">
                                        {project.languages instanceof Object ? "languages : " + project.languages.map((language) => (
                                            " " + language.name
                                        )) : ""}
                                    </p>
                                    <p className="mt-1">
                                        {project.libs instanceof Object ? "libraries : " + project.libs.map((lib) => (
                                            " " + lib.name
                                        )) : ""}
                                    </p>
                                    <p className="mt-1">
                                        {project.graphics instanceof Object ? "API graphique: " + project.graphics.name : ""}
                                    </p>
                                    <p className="mt-1">
                                        {project.start ? "début : " + project.start : ""}
                                    </p>
                                    <p className="mt-1">
                                        {project.duration ? "durée : " + project.duration : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap -m-4">
                                {project.gallery ? project.gallery.map((element) => (
                                    <div className="flex relative lg:w-1/4 px-6 mt-4 ">
                                        {element.youtube ? <iframe src={element.youtube} className="inset-0 w-full h-full object-cover object-center"
                                                                   title="YouTube video player" frameBorder="0"
                                                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                   allowFullScreen></iframe> : ""}
                                        {element.image ? <img className="inset-0 w-full h-full object-cover object-center"
                                            src={element.image}/> : ""}
                                    </div>

                                )) : ""}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}