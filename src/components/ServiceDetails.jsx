// *****************************************************************
// الملف: ServiceDetails.jsx (الكود المُعدَّل بالكامل)
// *****************************************************************
"use client";
import React from 'react';
import { useServiceStore } from "@/store/useServiceStore";
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
// تأكد أن هذا الملف يحتوي على MainTech المُعدَّلة بـ ID
import MainTech, { mobileAppShapes, ourProcess } from '@/app/servicesdetailes/services_detailes_model'; 

// استيراد الأيقونات كما تم الاتفاق عليه
import { FaReact, FaNodeJs, FaPhp, FaBug, FaBrain, FaServer, FaGitAlt, FaCloud, FaAtom, FaPencilRuler } from 'react-icons/fa'; // 👈 أضفنا FaPencilRuler
import { SiFigma, SiFlutter, SiDart, SiNextdotjs, SiTailwindcss, SiExpress, SiMongoose, SiPostgresql, SiMongodb, SiRedis, SiTestinglibrary, SiPostman, SiMysql, SiAdobe, SiNotion, SiGit } from 'react-icons/si';
import { IoLogoLaravel } from 'react-icons/io5';


// دالة ربط الأيقونات
const IconMap = {
    FaReact, FaNodeJs, IoLogoLaravel, FaPhp, FaBug, FaBrain, FaServer, FaGitAlt, FaCloud, FaAtom,
    SiFigma, SiFlutter, SiDart, SiNextdotjs, SiTailwindcss, SiExpress, SiMongoose, 
    SiPostgresql, SiMongodb, SiRedis, SiTestinglibrary, SiPostman, SiMysql, SiAdobe, SiNotion, SiGit
};

// 🎨 الدالة الجديدة لتحديد لون الأيقونة حسب اسمها
const getIconColor = (iconName) => {
    switch (iconName) {
    // Front-End (أزرق فاقع، سيان، فوشيا)
    case 'FaReact':
    case 'SiNextdotjs':
        return '#00BFFF'; // أزرق سماوي فاقع (Deep Sky Blue)
    case 'SiTailwindcss':
        return '#00FFFF'; // سيان لامع (Aqua)
    case 'FaAtom': // البديل لـ Zustand
        return '#FF00FF'; // فوشيا لامع (Fuchsia)
        
    // Back-End (أخضر صريح، أحمر ناري، بنفسجي ساطع)
    case 'FaNodeJs':
        return '#00FF00'; // أخضر صريح (Lime)
    case 'IoLogoLaravel':
        return '#FF4500'; // أحمر برتقالي ناري (Orange Red)
    case 'FaPhp':
        return '#9933FF'; // بنفسجي ساطع (Electric Violet)
    case 'SiExpress':
        return '#333333'; // أسود غامق 
    case 'FaServer':
        return '#4169E1'; // أزرق ملكي قوي
    
    // UI/UX (برتقالي مشرق، أحمر قوي)
    case 'SiFigma':
        return '#FFA500'; // برتقالي ساطع (Orange)
    case 'SiAdobe':
        return '#CC0000'; // أحمر غامق وقوي (Dark Red)
    
    // Mobile (Flutter)
    case 'SiFlutter':
        return '#1E90FF'; // أزرق داكن (Dodger Blue)
    case 'SiDart':
        return '#007FFF'; // أزرق رائع (Azure)
        
    // Databases (أزرق ساطع، أخضر مشرق، أحمر قوي)
    case 'SiMysql':
        return '#007AA5'; // أزرق مائي غامق
    case 'SiPostgresql':
        return '#005581'; // أزرق داكن (Dark Blue)
    case 'SiMongodb':
        return '#00CC66'; // أخضر نعناعي مشرق (Mint Green)
    case 'SiRedis':
        return '#FF0000'; // أحمر نقي (Pure Red)
    
    // Tools (أصفر، برتقالي، أزرق ساطع)
    case 'FaGitAlt':
    case 'SiGit':
        return '#FF6600'; // برتقالي مشرق (Vibrant Orange)
    case 'SiPostman':
        return '#FF8C00'; // برتقالي غامق (Dark Orange)
    case 'FaCloud':
        return '#0099FF'; // أزرق ساطع وجميل (Bright Blue)
    case 'SiTestinglibrary':
    case 'FaBug':
        return '#CCFF00'; // أصفر صريح وواضح (Pure Yellow)
        
    default:
        return '#8A2BE2'; // لون افتراضي (بنفسجي مشرق)
    }
};


const ServiceDetails = ({ styles }) => {
    
    const { selectedService } = useServiceStore();

    if (!selectedService) {
        return (
            <div style={{ padding: "60px", textAlign: "center" }}>
                <h2>No service selected.</h2>
                <p>Go back to <a href="/services" style={{ color: "#0070f3" }}>services page</a>.</p>
            </div>
        );
    }

    const item = selectedService;

    // 🆕 منطق الترشيح الشرطي لأقسام التقنيات
   // 🆕 منطق الترشيح الشرطي لأقسام التقنيات
    const techVisibilityMap = {
    'mobile': [
 "uiux_design_methodology", 
 "flutter_dev", 
"backend_dev", 
 "database_model", 
 "dev_tools_devops"
],
     'website': [
   "uiux_design_methodology", 
     "frontend_dev", 
    "backend_dev", 
    "database_model", 
    "dev_tools_devops"
    ],
    'uiux': [
     "uiux_design_methodology", 
  
     ], 
   'maintenance': [
    "flutter_dev", 
    "frontend_dev", 
    "backend_dev", 
    "database_model", 
     "dev_tools_devops"
     ],
     };

    const allowedTechIds = techVisibilityMap[item.category] || [];

    const filteredTechs = MainTech.data.filter(techSection => 
        allowedTechIds.includes(techSection.id)
    );
    // 💥 الآن، filteredTechs تحتوي على الأقسام التي يجب عرضها فقط.

    return (
        <div className={styles?.sub_body || "p-10"}>
            <section className={styles?.herosection || "flex flex-col md:flex-row gap-10 items-center"}>

                <div className={styles?.texthoc || ""}>
                    <h1>
                        We build smooth and
                        <br />
                        practical {item.title}
                        <br />
                        that serve your project and
                        <br />
                        earn your customers'<br />satisfaction.
                    </h1>
                    <h4>
                        {item.description}
                    </h4>
                    <div className={styles?.buttons || "flex gap-4 mt-4"}>
                        <PrimaryButton text={"START YOUR PROJECT NOW"} href={"contact"} />
                        <SecondaryButton text={"SEE OUR WORK"} href={"ourwork"} />
                    </div>

                </div>

                <div className={styles?.imghoc || ""}>
                    <img src={item.image} alt={item.title} style={{ maxWidth: "400px", borderRadius: "12px" }} loading="lazy" />
                </div>
            </section>

            <div className={styles.whitesection}>
                <p>
                    We design and develop custom mobile applications
                    tailored to your business needs, with a
                    <br />
                    full focus on user experience and performance.
                </p>
            </div>

            <div className={styles.whySection}>
                <h1>Why choose us in Mobile Apps</h1>
                <div className={styles.whyCards}>

                    {mobileAppShapes.map((shape) => (
                        <div key={shape.id} className={styles.card}>
                            <img src={shape.image} alt="" /> 
                            <h4>{shape.title}</h4>
                        </div>
                    ))}
                </div>

            </div>
            <section className={styles.ourProcess}>
                <h1>Our Process (How We Work With You in This Service)</h1>
                <div className={styles.processCards}>
                    {ourProcess.map((process) => (
                        <div key={process.id} className={styles.processCards}>
                            <div className={styles.singlecard}>
                                <h2>{process.title}</h2>
                                <p>{process.description}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </section>

            <div className={styles.technologies}>
                <h1>Technologies We Use</h1>
                {/* 💥 استخدام filteredTechs بدلاً من MainTech.data لعرض الأقسام المُفَلتَرة 💥 */}
                {filteredTechs.map((techItem, index) => (
                    <div className={styles.mainTech} key={index}>
                        <div className={styles.content}>
                            <img src={techItem.image} alt="skill" /> 

                            <div className={styles.sidecontent}>
                                <div className={styles.titleshub}>
                                    {techItem.titles.map((title, i) => (
                                        <div className={styles.titles} key={i}>
                                            <h2>{title}</h2>
                                        </div>
                                    ))}
                                    <br />
                                </div>

                                <div className={styles.icons}>
                                    {techItem.icons.map((iconName, i) => {
                                        const IconComponent = IconMap[iconName];
                                        return IconComponent ? (
                                            <IconComponent 
                                                key={i} 
                                                size={20} 
                                                color={getIconColor(iconName)}
                                                className={styles?.iconClass || "hover:opacity-80 transition-opacity"}
                                            /> 
                                        ) : (
                                            <span key={i} className="text-red-500">?</span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.buttonsFot}>
                <PrimaryButton text={"START YOUR PROJECT NOW"} href={"/contact"} />
            </div>

        </div>

    );
};

export default ServiceDetails;