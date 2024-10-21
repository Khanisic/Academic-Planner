const courses = [
    { name: "CS 514", type: "required", sem: "both" },
    { name: "CS 520", type: "required", sem: "both" },
    { name: "CS 590", type: "required", sem: "both" },
    { name: "CS 571", type: "required", sem: "both" },
    { name: "CS 591", type: "conc", sem: "spring" },
    { name: "CS 592", type: "conc", sem: "spring" },
    { name: "CS 593", type: "conc", sem: "spring" },
    { name: "CS 515", type: "conc", sem: "both" },
    { name: "CS 535", type: "conc", sem: "both" },
    { name: "CS 595", type: "conc", sem: "spring" },
    { name: "CS 531", type: "elective", sem: "both" },
  ];
  
  const constraints = {
    semesters: [
      { name: "Semester 1", term: "fall", maxCourses: 3 },
      { name: "Semester 2", term: "spring", maxCourses: 3 },
      { name: "Semester 3", term: "fall", maxCourses: 3 },
      { name: "Semester 4", term: "spring", maxCourses: 2 },
    ],
    requiredCourses: ["CS 514", "CS 520", "CS 590", "CS 571"],
  };
  
  function generatePaths(courses, constraints) {
    const { semesters, requiredCourses } = constraints;

    function getCoursesByTerm(term) {
      return courses.filter(
        (course) => course.sem === term || course.sem === "both"
      );
    }
  
    const firstSemCourses = getCoursesByTerm("both").filter((course) =>
      requiredCourses.includes(course.name)
    );
  
    const semester1Combos = combinations(firstSemCourses, 3);
  
    const paths = [];
  
    for (const sem1 of semester1Combos) {
      const sem1CourseNames = sem1.map((c) => c.name);
  
      const remainingRequired = requiredCourses.filter(
        (rc) => !sem1CourseNames.includes(rc)
      );
  
      const secondSemCourses = courses.filter(
        (course) =>
          (course.sem === "spring" || course.sem === "both") &&
          (remainingRequired.includes(course.name) || course.type !== "required")
      );
  
      const semester2Combos = combinations(secondSemCourses, 3).filter((combo) =>
        remainingRequired.every((rc) => combo.some((c) => c.name === rc))
      );
  
      for (const sem2 of semester2Combos) {
        const sem2CourseNames = sem2.map((c) => c.name);
  
        const coursesTaken = sem1CourseNames.concat(sem2CourseNames);
  
        const remainingCourses = courses.filter(
          (course) =>
            !coursesTaken.includes(course.name) && course.type !== "required"
        );
  
        const semester3Courses = getCoursesByTerm("both").filter((course) =>
          remainingCourses.includes(course)
        );
  
        const semester3Combos = combinations(semester3Courses, 3);
  
        for (const sem3 of semester3Combos) {
          const sem3CourseNames = sem3.map((c) => c.name);
  

          const coursesTakenSoFar = coursesTaken.concat(sem3CourseNames);

          const semester4Courses = courses.filter(
            (course) =>
              (course.sem === "spring" || course.sem === "both") &&
              !coursesTakenSoFar.includes(course.name) &&
              course.type !== "required"
          );
  
          const semester4Combos = combinations(semester4Courses, 2);
  
          for (const sem4 of semester4Combos) {
            const sem4CourseNames = sem4.map((c) => c.name);
  
            const allCoursesTaken = coursesTakenSoFar.concat(sem4CourseNames);
  
            const uniqueCourses = new Set(allCoursesTaken);
            if (uniqueCourses.size !== allCoursesTaken.length) {
              continue; 
            }
  
            paths.push({
              "Semester 1": sem1CourseNames,
              "Semester 2": sem2CourseNames,
              "Semester 3": sem3CourseNames,
              "Semester 4": sem4CourseNames,
            });
          }
        }
      }
    }
  
    return paths;
  }
  
  function combinations(array, size) {
    const result = [];
  
    function combine(start, combo) {
      if (combo.length === size) {
        result.push(combo);
        return;
      }
      for (let i = start; i < array.length; i++) {
        combine(i + 1, combo.concat(array[i]));
      }
    }
  
    combine(0, []);
    return result;
  }
  
  const paths = generatePaths(courses, constraints);
  console.log(JSON.stringify(paths, null, 2));
  console.log(`Total valid paths: ${paths.length}`);