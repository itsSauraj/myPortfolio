import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

import { styles } from '../styles'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'

const Tech = () => {
    return (
        <div className='flex flex-row flex-wrap justify-center gap-10'>
            {technologies.map((technology, index) => (
                <div className='w-28 h-28' key={technology.name}>
                    {/* <BallCanvas icon={technology.icon} /> */}
                    <motion.div
                        variants={fadeIn("right","spring",0.5 * index,0.75)}
                        className="w-full green-pink-gradient p-[1px] rounded-full shadow-card"
                    >
                        <img src={technology.icon} alt={technology.name}
                            className="rounded-full w-full h-full 
                            object-contain bg-tertiary p-3"
                            options={{
                                max: 45,
                                scale: 1,
                                speed: 450
                            }}
                        />
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default SectionWrapper(Tech, "");
