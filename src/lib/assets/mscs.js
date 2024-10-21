export const csis = {
  "program": "Masters in Computer Science",
  "requirements": {
    "required_courses": [
      {
        "course_code": "CS 520",
        "course_name": "Advanced Computer Architecture",
        "hours": 3,
        "desc": "Fundamental computer sub-systems: central processing unit, memory systems, control and input/output units. General-purpose computing systems design. Examples from existing typical computers.",
        "alternative": {
          "course_code": "CS 625",
          "course_name": "Operating Systems Design",
          "hours": 3,
          "desc": "Advanced concepts in operating system design, including process and thread management, virtual memory, interprocess communication, distributed systems, parallel and distributed file system designs, and security."
        }
      },
      {
        "course_code": "CS 590",
        "course_name": "Fundamentals of Software Engineering",
        "hours": 3,
        "desc": "Software engineering principles including product, process models, system engineering, analysis, design, architectural and user interface design, testing, implementation, and maintenance.",
        "alternative": {
          "course_code": "CS 591",
          "course_name": "Software Project Management",
          "hours": 3,
          "desc": "Methods of PMBOK-based management of software design and development projects, including systems view, main project management process groups, management plans, metrics, estimates, and project documentation."
        }
      },
      {
        "course_code": "CS 514",
        "course_name": "Algorithms",
        "hours": 3,
        "desc": "Design and analysis of algorithms, including dynamic structures maintenance, hashing, searching, sorting, traversal, computational complexity, NP-hard and NP-complete problems.",
        "alternative": {
          "course_code": "CS 612",
          "course_name": "Automata, Computation and Complexity",
          "hours": 3,
          "desc": "Theory of formal languages and computability, Turing machines, grammars, complexity classes, P and NP problems, NP-complete problems, and limits of effective computability."
        }
      },
      {
        "course_code": "CS 561",
        "course_name": "Artificial Intelligence",
        "hours": 3,
        "desc": "Covers pattern recognition, search strategies, game playing, knowledge representation, logic programming, uncertainty, vision, natural language processing, and robotics.",
        // "faculty": [
        //   {
        //     "sem": "fall",
        //     "year": "2023",
        //     "faculty": "Dr. Abc"
        //   }
        // ],
        "alternative": {
          "course_code": "CS 571",
          "course_name": "Database Management Systems",
          "hours": 3,
          "desc": "Relational database design, entity relationship modeling, SQL for creating and querying databases, relational algebra, query optimization, and database management system implementation."
        }
      }
    ]
  },
  "concentrations": [
    {
      "name": "Computer Game Technology",
      "about": "Provides essential background, understanding, and skills in computer game technology and software design.",
      "required_courses": [
        {
          "course_code": "CIS 551",
          "course_name": "Computer Game Design",
          "hours": 3,
          "desc": "Gameplay, storytelling, interface and information design, play mechanics, and game balancing."
        },
        {
          "course_code": "CIS 552",
          "course_name": "Computer Game Modification",
          "hours": 3,
          "desc": "Software development aspects of game engine modification, event loops, threading, collision detection, and networking."
        }
      ],
      "electives": [
        {
          "course_code": "CIS 553",
          "course_name": "Concepting and Storytelling",
          "hours": 3,
          "desc": "Covers narrative and interactive development for games, from concept to production."
        },
        {
          "course_code": "CIS 555",
          "course_name": "Computer Graphics",
          "hours": 3,
          "desc": "Introduction to 2D and 3D graphics, OpenGL, transformations, image synthesis, and rendering."
        },
        {
          "course_code": "CIS 556",
          "course_name": "Game Engine Programming",
          "hours": 3,
          "desc": "Advanced techniques in game engine programming, including multi-user games and virtual reality simulations."
        },
        {
          "course_code": "CIS 557",
          "course_name": "Digital Animation",
          "hours": 3,
          "desc": "Covers modeling and animation for print and time-based media."
        },
        {
          "course_code": "CIS 558",
          "course_name": "Sound Design",
          "hours": 3,
          "desc": "Covers music composition, sound recording, digital game technologies, and 3D sound processing."
        },
        {
          "course_code": "CIS 559",
          "course_name": "Computer Game Capstone Project",
          "hours": 3,
          "desc": "Advanced game design, software development, and production with a multi-disciplinary team project."
        }
      ]
    },
    {
      "name": "Emerging Topics in CS/CIS",
      "about": "This concentration provides students with essential background, understanding, in-depth knowledge, and unique skills in emerging areas of computer science.",
      "required_courses": [
        {
          "course_code": "CS 699",
          "course_name": "Thesis in Computer Information Systems",
          "hours": 6,
          "desc": "Computer science research and thesis preparation for graduate students choosing the thesis option."
        }
      ],
      "electives": [
        {
          "course_code": "CS 697",
          "course_name": "Advanced Topics in CIS",
          "hours": 3,
          "desc": "Special projects on advanced problems in various areas of computer science, with a focus on emerging technologies."
        },
        {
          "course_code": "CS 698",
          "course_name": "Directed Individual Studies in CIS",
          "hours": 3,
          "desc": "Individual study or research project under supervision of faculty in an area relevant to professional goals."
        }
      ]
    },
    {
      "name": "Data Science",
      "about": "The data science concentration provides essential skills for discovering knowledge from data, including machine learning, AI, statistics, and Big Data.",
      "required_courses": [
        {
          "course_code": "CS 560",
          "course_name": "Fundamentals of Data Science",
          "hours": 3,
          "desc": "Introduction to inferential and computational thinking applied to real-world problems, using statistical inference and machine learning algorithms."
        },
        {
          "course_code": "CS 563",
          "course_name": "Knowledge Discovery and Data Mining",
          "hours": 3,
          "desc": "Techniques for data cleansing, machine learning algorithms, trend analysis, and ensemble systems in knowledge discovery and data mining."
        }
      ],
      "electives": [
        {
          "course_code": "CS 561",
          "course_name": "Artificial Intelligence",
          "hours": 3,
          "desc": "Covers pattern recognition, search strategies, game playing, and knowledge representation."
        },
        {
          "course_code": "CS 562",
          "course_name": "Machine Learning",
          "hours": 3,
          "desc": "Introduces various approaches to machine learning, including neural networks, regression, and genetic algorithms."
        },
        {
          "course_code": "CS 572",
          "course_name": "Distributed Databases and Big Data",
          "hours": 3,
          "desc": "Covers topics like distributed databases, data replication, concurrency, and Big Data technologies like Hadoop."
        }
      ]
    },
    {
      "name": "Mobile Computing",
      "about": "This concentration focuses on mobile technologies and applications, including design and development of complex mobile software systems.",
      "required_courses": [
        {
          "course_code": "CIS 533",
          "course_name": "Mobile and Wireless Networks",
          "hours": 3,
          "desc": "Fundamental concepts in mobile and wireless networks, including protocols, wireless LAN, and sensor networks."
        },
        {
          "course_code": "CIS 546",
          "course_name": "Advanced Mobile Programming",
          "hours": 3,
          "desc": "Advanced programming techniques for mobile systems, including databases, SDKs, and development of mobile software."
        }
      ],
      "electives": [
        {
          "course_code": "CIS 535",
          "course_name": "Computer Networks and System Security",
          "hours": 3,
          "desc": "Focus on principles of network and systems security, covering topics such as data encryption and security evaluation."
        },
        {
          "course_code": "CIS 595",
          "course_name": "Software and Web Applications Security",
          "hours": 3,
          "desc": "Security methods for software and web applications, focusing on secure development practices and risk management."
        },
        {
          "course_code": "CS 593",
          "course_name": "Agile Software Development",
          "hours": 3,
          "desc": "Covers agile methodologies and techniques, including SDLC models, testing, and quality issues."
        }
      ]
    },
    {
      "name": "Software Engineering",
      "about": "Provides essential knowledge and skills in software engineering, including concepts, models, methods, tools, and techniques.",
      "required_courses": [
        {
          "course_code": "CS 590",
          "course_name": "Fundamentals of Software Engineering",
          "hours": 3,
          "desc": "Focus on software engineering principles, covering process models, design, testing, and maintenance.",
          "alternative": {
            "course_code": "CS 591",
            "course_name": "Software Project Management",
            "hours": 3,
            "desc": "Covers PMBOK-based management techniques for software development projects."
          }
        }
      ],
      "electives": [
        {
          "course_code": "CS 592",
          "course_name": "Requirements Engineering",
          "hours": 3,
          "desc": "Covers principles of requirements engineering, including elicitation, specification, and validation of software requirements."
        },
        {
          "course_code": "CS 690",
          "course_name": "Advanced Topics on Software Engineering",
          "hours": 3,
          "desc": "Focuses on special software engineering projects and emerging technologies in the field."
        }
      ]
    },
    {
      "name": "Cybersecurity",
      "about": "Covers key aspects of software, web, and network security, focusing on secure software design and development.",
      "required_courses": [
        {
          "course_code": "CIS 515",
          "course_name": "Applied Cryptography",
          "hours": 3,
          "desc": "Overview of cryptographic algorithms, key management, digital certificates, and the design of cryptographic applications."
        },
        {
          "course_code": "CIS 535",
          "course_name": "Computer Networks and System Security",
          "hours": 3,
          "desc": "Focus on computer network security, covering topics such as authentication, authorization, and protection against internal and external attacks."
        },
        {
          "course_code": "CIS 595",
          "course_name": "Software and Web Applications Security",
          "hours": 3,
          "desc": "Focus on secure software and web application design, covering software security models and risk assessment."
        }
      ]
    },
    {
      "name": "Theoretical Computer Science",
      "about": "Provides essential background in theoretical computer science, including formal languages, automata, and computational complexity.",
      "required_courses": [
        {
          "course_code": "CS 514",
          "course_name": "Algorithms",
          "hours": 3,
          "desc": "Focuses on design and analysis of algorithms, including complexity theory and NP-complete problems.",
          "alternative": {
            "course_code": "CS 612",
            "course_name": "Automata, Computation and Complexity",
            "hours": 3,
            "desc": "Covers formal languages, Turing machines, parsing, and complexity classes such as P and NP."
          }
        }
      ],
      "electives": [
        {
          "course_code": "CS 503",
          "course_name": "Programming Methodology",
          "hours": 3,
          "desc": "Covers Dijkstra's methodology of algorithm development, predicate calculus, and verification techniques."
        },
        {
          "course_code": "CS 516",
          "course_name": "Programming Languages",
          "hours": 3,
          "desc": "Focuses on design concepts of high-level programming languages, including grammars, syntax, and data structures."
        },
        {
          "course_code": "CS 614",
          "course_name": "Parallel Algorithms",
          "hours": 3,
          "desc": "Introduces parallel algorithms for multi-processor architectures, covering concurrent programming and complexity."
        }
      ]
    },
    {
      "name": "Web Technologies and Systems",
      "about": "Focuses on design and development of web technologies and integrated web-based systems and applications.",
      "required_courses": [
        {
          "course_code": "CS 531",
          "course_name": "Web Development Technologies",
          "hours": 3,
          "desc": "Covers web technologies such as PERL, CGI, XHTML, XML, and JavaScript, focusing on both client and server-side development."
        }
      ],
      "electives": [
        {
          "course_code": "CS 520",
          "course_name": "Advanced Computer Architecture",
          "hours": 3,
          "desc": "Focus on fundamental computer sub-systems and general-purpose computing system design."
        },
        {
          "course_code": "CS 532",
          "course_name": "Advanced Java Computing",
          "hours": 3,
          "desc": "Focuses on developing web-based systems using J2EE Java technologies, including Java Servlets and JavaServer Pages."
        },
        {
          "course_code": "CIS 545",
          "course_name": "Integrative Programming and Technology",
          "hours": 3,
          "desc": "Focus on data mapping, data exchange between systems, and integrative programming practices."
        },
        {
          "course_code": "CS 593",
          "course_name": "Agile Software Development",
          "hours": 3,
          "desc": "Covers agile methods and agile software engineering practices, focusing on SDLC models, testing, and quality control."
        },
        {
          "course_code": "CS 625",
          "course_name": "Operating Systems Design",
          "hours": 3,
          "desc": "Focuses on process and thread management, virtual memory, distributed systems, and security."
        },
        {
          "course_code": "CS 635",
          "course_name": "Data Communications and Networks",
          "hours": 3,
          "desc": "Covers data communication, network architectures and protocols, with emphasis on TCP/IP and wireless networks."
        }
      ]
    }
  ]
}
