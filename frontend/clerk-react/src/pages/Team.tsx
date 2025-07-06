import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Users, Heart, Code, Target, Eye, Handshake, ArrowRight, CheckCircle, Zap, Award } from 'lucide-react';

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Ritesh Kumar Singh",
      role: "Full Stack & DevOps Engineer • Founder",
      image: "https://via.placeholder.com/300x300/2d2d2d/FFFFFF?text=JD",
      github: "https://github.com/neutron420",
      linkedin: "https://www.linkedin.com/in/ritesh-singh1/",
      bio: "Passionate about building scalable solutions that drive business growth and innovation. Expert in cloud architecture and modern development practices."
    },
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description: "Every decision we make prioritizes the needs and experiences of our customers, ensuring exceptional service delivery."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Transparency",
      description: "Open processes, clear communication, and accountable operations at every step of our journey together."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Excellence",
      description: "Understanding real challenges and building solutions with precision, care, and unwavering attention to detail."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to solve complex business challenges and create meaningful impact."
    }
  ];

  const workProcess = [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, challenges, and requirements through comprehensive consultation and strategic planning.",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "2", 
      title: "Design & Development",
      description: "Our team creates user-centered designs and develops robust solutions using modern technologies and best practices.",
      icon: <Code className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Testing & Deployment",
      description: "Rigorous testing ensures quality, followed by seamless deployment and ongoing support for optimal performance.",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const AnimatedCounter = ({ endValue, duration = 2000 }: { endValue: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
      if (!isVisible) return;

      const isPercentage = endValue.includes('%');
      const isPlus = endValue.includes('+');
      const isSlash = endValue.includes('/');
      
      let numericValue: number;
      if (isPercentage) {
        numericValue = parseInt(endValue.replace('%', ''));
      } else if (isPlus) {
        numericValue = parseInt(endValue.replace('+', ''));
      } else if (isSlash) {
        numericValue = parseInt(endValue.split('/')[0]);
      } else {
        numericValue = parseInt(endValue);
      }

      const increment = numericValue / (duration / 50);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(timer);
    }, [isVisible, endValue, duration]);

    const formatValue = (value: number) => {
      if (endValue.includes('%')) return `${value}%`;
      if (endValue.includes('+')) return `${value}+`;
      if (endValue.includes('/')) return `${value}/7`;
      return value.toString();
    };

    return (
      <div ref={elementRef} className="text-3xl font-bold text-black mb-2">
        {formatValue(count)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-16"> {/* Added pt-16 for navbar spacing */}
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-lg">
            <Handshake className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Meet Our
            <span className="block text-black">
              Expert Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Passionate professionals working together to transform how businesses operate and grow through innovative technology solutions
          </p>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-black border border-gray-300 px-6 py-3 rounded-full">
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-black">Our Purpose</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We exist to bridge the gap between businesses and technology. Every team member brings unique expertise 
                to create solutions that truly serve our clients and drive meaningful, measurable results.
              </p>
            </div>
            
            <div className="bg-black p-10 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-7 h-7 text-black" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Commitment</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Building transparent, efficient, and accessible solutions. We're committed to ensuring 
                every client receives exceptional service and every project delivers measurable business impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values shape every decision, every interaction, and every solution we create
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl hover:border-black transition-all duration-300 h-full">
                  <div className="text-gray-600 mb-6 flex justify-center group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Core Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind our success
            </p>
          </div>
          <div className="flex justify-center">
            <div className="max-w-lg">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                  <div className="p-10 text-center">
                    <div className="relative inline-block mb-8">
                      <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                        <span className="text-3xl font-bold text-white">JD</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg">
                        <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 font-semibold mb-4 text-lg">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="flex justify-center gap-4">
                      {member.github && (
                        <a href={member.github} className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group/icon">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group/icon">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              How We Work Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our collaborative approach ensures every project delivers exceptional results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {workProcess.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-black transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="text-gray-600">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-black">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects Completed", icon: <Award className="w-6 h-6" /> },
              { number: "98%", label: "Client Satisfaction", icon: <Heart className="w-6 h-6" /> },
              { number: "3+", label: "Years Experience", icon: <Zap className="w-6 h-6" /> },
              { number: "24/7", label: "Support Available", icon: <Users className="w-6 h-6" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-gray-600 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <AnimatedCounter endValue={stat.number} duration={2000} />
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Let's discuss how our team can help transform your business with innovative solutions
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl">
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;