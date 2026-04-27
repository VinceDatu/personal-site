import { useEffect, useRef, useState } from 'react';
import * as icons from 'lucide-react';
import './App.css';

import { FaPython, FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGithub, FaPhp, FaJava, FaNodeJs } from 'react-icons/fa';
import { SiMysql, SiTypescript, SiCplusplus } from 'react-icons/si';

function App() {
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isResumeOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResumeOpen]);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const fadeDistance = 420;
        const rawProgress = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
        const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);
        const opacity = 1 - easedProgress;

        if (gradientRef.current) {
          gradientRef.current.style.opacity = `${opacity}`;
        }

        frameId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div 
        ref={gradientRef}
        className='fixed-gradient-bg' 
        aria-hidden='true' 
      />
      <div className='app-container'>
      <div className='top-section'>
        <div className='profile-card'>
          <div className='avatar-container'>
          <img 
            src='/profileImage.jpg' 
            alt='VLD Avatar' 
            className='avatar-image' 
          />
        </div>

        <div className='profile-info'>
          <h1 className='profile-name'>Vincent Lauren S. Datu</h1>
          <p className='profile-handle'>BS in Information Technology</p>

          <div className='profile-details'>
            <div className='detail-item'>
              <span role="img" aria-label="Location" className='detail-icon'><icons.Cake size={14} /></span>
              <span>05.05.2003</span>
            </div>
            <div className='detail-item'>
              <span role="img" aria-label="Location" className='detail-icon'><icons.Menu size={14} /></span>
              <span>Web Developer - IT Support</span>
            </div>
            <div className='detail-item'>
              <span role="img" aria-label="Developer" className='detail-icon'><icons.GraduationCap size={14} /></span>
              <span>BSIT Graduate at Cavite State University</span>
            </div>
            <div className='detail-item tech-stack'>
              <span role="img" aria-label="Developer" className='detail-icon'></span>
              <span><icons.Settings size={14} /> Technical skills: </span>
              <div className='tech-icons'>
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer"><FaHtml5 title="HTML5" /></a>
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer"><FaCss3Alt title="CSS3" /></a>
                <a href="https://www.php.net/" target="_blank" rel="noopener noreferrer"><FaPhp title="PHP" /></a>
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer"><FaJs title="JavaScript" /></a>
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><SiTypescript title="TypeScript" /></a>
                <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer"><FaPython title="Python" /></a>
                <a href="https://www.java.com/" target="_blank" rel="noopener noreferrer"><FaJava title="Java" /></a>
                <a href="https://isocpp.org/" target="_blank" rel="noopener noreferrer"><SiCplusplus title="C++" /></a>
                <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer"><SiMysql title="MySQL" /></a>
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer"><FaReact title="ReactJS" /></a>
                <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer"><FaBootstrap title="Bootstrap" /></a>
                <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><FaNodeJs title="Node.js" /></a>
                <a href="https://github.com/VinceDatu" target="_blank" rel="noopener noreferrer"><FaGithub title="GitHub" /></a>
              </div>
            </div>
          </div>

          <div className='profile-footer'>
            <div className='footer-item'>
              <icons.MapPin size={14} />
              <span>Taguig, Philippines</span>
            </div>
            <div className='footer-item'>
              <icons.GraduationCap size={14} />
              <span>Expected Graduation: Sept 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className='cards-grid'>
        <a
          href='mailto:vincentlaurendatu@gmail.com'
          className='link-card'
          style={{ background: '#ffffff', color: '#1e2030' }}
          aria-label='Compose email to vincentlaurendatu@gmail.com in Gmail'
          onClick={(e) => {
            e.preventDefault();
            const to = encodeURIComponent('vincentlaurendatu@gmail.com');
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;
            // Try to open Gmail compose in a new tab. If blocked/fails,
            // fall back to the mailto: URL which opens the default mail client.
            const win = window.open(gmailUrl, '_blank');
            if (!win) {
              window.location.href = `mailto:vincentlaurendatu@gmail.com`;
            }
          }}
        >
          <div className='card-icon email-icon' style={{ border: '1px solid #1e2030' }}>
            <icons.Mail size={24} color="#1e2030" />
          </div>
          <icons.ExternalLink size={16} className='external-icon' color='#1e2030' aria-hidden='true' />
          <div>
            <div className='card-title'>Email</div>
            <div className='card-subtitle' style={{ color: '#6b7280' }}>vincentlaurendatu@gmail.com</div>
          </div>
        </a>

        <a href='https://facebook.com/VincentDatuDev' target='_blank' rel='noreferrer' className='link-card' style={{ background: '#1c71f9' }}>
          <div className='card-icon facebook-icon' style={{ background: 'transparent', border: '1px solid #ffffff' }}>
            <icons.Facebook size={36} fill='white' stroke='none' />
          </div>
          <icons.ExternalLink size={16} className='external-icon' color='#c1d9ff' />
          <div>
            <div className='card-title'>Facebook</div>
            <div className='card-subtitle' style={{ color: '#c1d9ff' }}>@VincentDatuDev</div>
          </div>
        </a>

        <a
          href='/CV_Datu.pdf'
          className='link-card resume-card'
          onClick={(e) => {
            e.preventDefault();
            setIsResumeOpen(true);
          }}
        >
          <div className='card-icon' style={{ background: 'transparent', border: '1px solid #ffffff' }}>
            <icons.FileText size={32} />
          </div>
          <div className='resume-info github-info'>
            <div className='card-title'>Resume</div>
            <div className='card-subtitle'>View on this page</div>
          </div>
          <icons.ExternalLink size={20} className='external-icon' />
        </a>

        <a href='https://github.com/VinceDatu' target='_blank' rel='noreferrer' className='link-card github-card'>
          <div className='card-icon'>
            <icons.Github size={32} />
          </div>
          <div className='github-info'>
            <div className='card-title'>GitHub</div>
            <div className='card-subtitle'>@VinceDatu</div>
          </div>
          <button className='github-follow-btn'>Follow</button>
        </a>
      </div>
      </div>

            <div className='lower-sections'>
              <div className='lower-ambient-bg animate-on-scroll' aria-hidden='true' />

              <div className='about-section animate-on-scroll scroll-enhanced'>
                <h2 className='section-title'><icons.User size={24} /> About Me:</h2>
                <p className='about-text'>
                  I am a driven Information Technology graduate with a strong foundation in web development, Networking and IT support. 
                  I have experience and a good foundation in both frontend and backend programming, software and hardware configuration and troubleshooting. 
                  I am passionate about building efficient, user-centric web applications and managing robust database schemas. 
                  Always eager to learn and adapt to new technologies to create impactful digital experiences.
                </p>
              </div>

              <div className='experience-section animate-on-scroll scroll-enhanced'>
                <h2 className='section-title animate-on-scroll'><icons.BriefcaseBusiness size={24} /> Experiences:</h2>

              <div className='experience-item animate-on-scroll'>
                <div className='exp-header'>
                  <span className='exp-dot'>•</span>
                  <span className='exp-year'>(February 2026 - PRESENT (May 2026 expected finish))</span>
                </div>
                <div className='exp-content'>
                  <div className='exp-title'>Tech Internship, Telematico Corporation</div>
                  <div className='exp-subtitle'>Mandaluyong City</div>
                  <ul className='exp-list'>
                    <li>Learned about Networking fundamentals and Telephony under the professionals of
                        Telematico Corporation. Gained hands on experience with Networking basics and
                        Telephony solutions with the Grandstream platform.</li>
                    <li>General IT Support: Assisting daily operations and troubleshooting hardware(Printers and laptops).</li>
                    <li>Telephony Solutions: Shadowed and assisted in configuration of Grandstream devices as a Telephony Solution. 
                        Which included IP phones, gateways and PBX systems. Gained experience in configuring and troubleshooting these devices to ensure optimal performance and reliability.</li>
                    <li>Web Development: Optimized, updated and managed the company website “telematico.com.ph”. This involved maintaining the site's content, improving its performance, and ensuring its availability.</li>
                  </ul>
                </div>
              </div>

              <div className='experience-item animate-on-scroll'>
                <div className='exp-header'>
                  <span className='exp-dot'>•</span>
                  <span className='exp-year'>(August 2021 - November 2021)</span>
                </div>
                <div className='exp-content'>
                  <div className='exp-title'>PRIS: POPULATION REGISTRATION INFORMATION SYSTEM</div>
                  <div className='exp-subtitle'>Population management system for Barangay Pitogo</div>
                  <ul className='exp-list'>
                    <li>Created a Population management system for Barangay Pitogo using Java, which streamlined their census process.</li>
                    <li>Acted as a fullstack developer handling the frontend, backend programming and the repository schema for the application. The application was developed with Java on the NetBeans IDE.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='experience-section animate-on-scroll scroll-enhanced'>
              <h2 className='section-title animate-on-scroll'><icons.GraduationCap size={24} /> Education:</h2>
              
              <div className='experience-item animate-on-scroll'>
                <div className='exp-header'>
                  <span className='exp-dot'>•</span>
                  <span className='exp-year'>(2022 - 2026)</span>
                </div>
                <div className='exp-content'>
                  <div className='exp-title'>Cavite State University - Imus Campus</div>
                  <div className='exp-subtitle'>Bachelor of Science in Information Technology</div>
                  <ul className='exp-list'>
                    <li>Expected Graduation: September 2026</li>
                    <li>Developed CVSU NEXUM: An Extension Services Portal For Cavite State University -
                        Imus Campus as a capstone project. This aimed to showcase the various extension
                        services by the campus.</li>
                    <li>Relevant Coursework: Web Development, Database Management, Networking, IU/UX Design.</li>
                    <li>Designed responsive websites using HTML, CSS, JavaScript and other langauges listed in Skills.</li>
                  </ul>
                </div>
              </div>

              <div className='experience-item animate-on-scroll'>
                <div className='exp-header'>
                  <span className='exp-dot'>•</span>
                  <span className='exp-year'>(2020 - 2022)</span>
                </div>
                <div className='exp-content'>
                  <div className='exp-title'>SHS in San Nicholas III</div>
                  <div className='exp-subtitle'>TVL - Information and Communications Technology</div>
                  <ul className='exp-list'>
                    <li>Expected Graduation: September 2026</li>
                    <li>Developed CVSU NEXUM: An Extension Services Portal For Cavite State University -
                        Imus Campus as a capstone project. This aimed to showcase the various extension
                        services by the campus.</li>
                    <li>Relevant Coursework: Web Development, Database Management, Networking, IU/UX Design.</li>
                    <li>Designed responsive websites using HTML, CSS, JavaScript and other langauges listed in Skills.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

      </div>

      {isResumeOpen && (
        <div
          className='resume-modal-overlay'
          role='dialog'
          aria-modal='true'
          aria-label='Resume viewer'
          onClick={() => setIsResumeOpen(false)}
        >
          <div className='resume-modal' onClick={(e) => e.stopPropagation()}>
            <div className='resume-modal-header'>
              <h3>Resume</h3>
              <button
                type='button'
                className='resume-modal-close'
                aria-label='Close resume viewer'
                onClick={() => setIsResumeOpen(false)}
              >
                <icons.X size={20} />
              </button>
            </div>

            <iframe
              className='resume-modal-frame'
              src='/CV_Datu.pdf#view=FitH'
              title='Resume PDF'
            />

            <div className='resume-modal-actions'>
              <a href='/CV_Datu.pdf' target='_blank' rel='noreferrer'>
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
