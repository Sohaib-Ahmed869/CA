import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import logo from "../../../assets/cibt-logo.png";

const LLNAssessment = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 8; // Total number of questions

  const [formData, setFormData] = useState({
    studentName: "",
    date: "",
    qualification: "",
    question1: "", // 150 words essay
    question2: "", // 3 paragraphs about Great Ocean Road
    question3: {
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
    },
    question4: {
      a: "", // Who composed the Cats musical?
      b: "", // In which year was the first Cats performance?
      c: "", // What is the Cats musical about?
      d: "", // Name 3 other musicals by the same writer
      e: "", // How did the New York Times refer to Andrew Lloyd Webber?
    },
    question5: {
      a: "", // How much does Julie earn each day?
      b: "", // How much does she earn in one year?
      c: "", // How much tax will Julie pay in the year?
      d: "", // Pay rise tax calculation
    },
    question6: {
      a: "", // Cost of 4 bottles individually
      b: "", // Cost per bottle in pack of 5
      c: "", // Cost per liter for individual bottles
    },
    question7: {
      time: "",
      date: "",
    },
    question8: {
      power1: "", // 3^2
      power2: "", // 2^3
      ratio: "", // 4:3 = 12:?
      multiplication: "", // -7 x 3
      division: "", // 144 / 6
      fractionToPercentage: "", // ¾ = ?%
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], [field]: value }
          : value,
    }));
  };

  const validateSection = (section) => {
    // Basic validation, you can enhance this based on requirements
    switch (section) {
      case 1:
        return (
          formData.studentName.trim() !== "" &&
          formData.date.trim() !== "" &&
          formData.qualification.trim() !== ""
        );
      case 2:
        return formData.question1.trim() !== "";
      case 3:
        return formData.question2.trim() !== "";
      case 4:
        return (
          formData.question3.step1.trim() !== "" &&
          formData.question3.step2.trim() !== ""
        );
      case 5:
        return (
          formData.question4.a.trim() !== "" &&
          formData.question4.b.trim() !== "" &&
          formData.question4.c.trim() !== ""
        );
      case 6:
        return (
          formData.question5.a.trim() !== "" &&
          formData.question5.b.trim() !== ""
        );
      case 7:
        return (
          formData.question6.a.trim() !== "" &&
          formData.question6.b.trim() !== ""
        );
      case 8:
        return (
          formData.question7.time.trim() !== "" &&
          formData.question7.date.trim() !== ""
        );

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateSection(activeSection)) {
      setActiveSection((prev) => Math.min(prev + 1, totalSections));
    } else {
      alert("Please complete all required fields before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You might want to send the data to an API endpoint
  };

  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-28 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 " />

            <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
              Cove Institute of Business & Trade
            </h1>
            <h2 className="text-2xl font-medium text-emerald-700">
              LLN Assessment
            </h2>
            <p className="text-sm text-gray-500">RTO NO: 45665</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Step {activeSection} of {totalSections}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Student Details Section */}
            {activeSection === 1 && (
              <StudentDetails
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Question 1 */}
            {activeSection === 2 && (
              <Question1
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Question 2 */}
            {activeSection === 3 && (
              <Question2
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Question 3 */}
            {activeSection === 4 && (
              <Question3
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Question 4 */}
            {activeSection === 5 && (
              <Question4
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Question 5 */}
            {activeSection === 6 && (
              <Question5
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Question 6 & 7 Combined */}
            {activeSection === 7 && (
              <div>
                <Question6
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
                <div className="mt-8">
                  <Question7
                    formData={formData}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Question 8 */}
            {activeSection === 8 && (
              <Question8
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={activeSection === 1}
                className="flex items-center px-6 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md disabled:opacity-50"
              >
                <BsChevronLeft className="mr-2" /> Back
              </button>

              {activeSection === totalSections ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Next <BsChevronRight className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Student Details Component
const StudentDetails = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Student Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="studentName"
            className="block text-gray-700 font-medium mb-2"
          >
            Student Name:
          </label>
          <input
            type="text"
            id="studentName"
            value={formData.studentName}
            onChange={(e) =>
              handleInputChange("studentName", null, e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-gray-700 font-medium mb-2"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", null, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="qualification"
            className="block text-gray-700 font-medium mb-2"
          >
            Qualification code and name:
          </label>
          <input
            type="text"
            id="qualification"
            value={formData.qualification}
            onChange={(e) =>
              handleInputChange("qualification", null, e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Instructions
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Please read each question carefully and then answer them as fully as
            possible.
          </li>
          <li>Please do not leave any spaces blank or questions unanswered.</li>
          <li>Do not accept any help from another person.</li>
          <li>Do not use a dictionary or a calculator.</li>
          <li>Please be honest it is in your best interest!</li>
        </ul>
      </div>
    </div>
  );
};

// Question 1 Component
const Question1 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Language and Literacy
      </h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 1:
        </h4>
        <p className="mb-4">
          In approximately 150 words, please explain the main reason you decided
          to enroll into this course, how you will benefit from its completion
          and one skill you have that will help you to complete the course.
        </p>
        <textarea
          value={formData.question1}
          onChange={(e) => handleInputChange("question1", null, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[200px]"
          placeholder="Write your answer here..."
          required
        ></textarea>
        <div className="mt-2 text-sm text-gray-500 flex justify-end">
          Word count: {formData.question1.split(/\s+/).filter(Boolean).length}
          /150
        </div>
      </div>
    </div>
  );
};

// Question 2 Component
const Question2 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Language and Literacy
      </h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 2:
        </h4>
        <p className="mb-4">
          Read the following points and write 3 paragraphs about the Great Ocean
          Road:
        </p>
        <ul className="list-disc ml-5 mb-4 space-y-1">
          <li>Australian National Heritage listed.</li>
          <li>243 kilometres long</li>
          <li>On the south-eastern coast of Australia</li>
          <li>Is in Victoria</li>
          <li>Set between Torquay and Allansford.</li>
          <li>Built by returned soldiers between 1919 and 1932 and</li>
          <li>
            dedicated to soldiers killed during World War I, the road is the
          </li>
          <li>World's largest war memorial.</li>
          <li>
            Provides access to several prominent landmarks, such as the Twelve
            Apostles limestone stack formations.
          </li>
          <li>The road is an important tourist attraction in the region.</li>
        </ul>
        <textarea
          value={formData.question2}
          onChange={(e) => handleInputChange("question2", null, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[300px]"
          placeholder="Write your 3 paragraphs here..."
          required
        ></textarea>
      </div>
    </div>
  );
};

// Question 3 Component
const Question3 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Language and Literacy
      </h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 3:
        </h4>
        <p className="mb-4">
          Read the following paragraph, identify the real instructions and then
          create a step-by-step process for a recipe on baking a cake.
        </p>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-6">
          <p className="italic">
            When you are baking a cake, it is important that you enjoy the
            experience. Your kitchen should be bright and happy, and you must
            use all the best ingredients. You want the cake to come out looking
            great, so make sure that you start by greasing a 28 cm x 18 cm
            lamington tin, and line the base with greaseproof paper. If you are
            so inclined, you might want to gather all the ingredients together
            as it can be helpful to premeasure everything so that it is quick.
            Combine all ingredients in a small bowl of an electric mixer. Watch
            the ingredients all blend together. Beat on low speed until blended,
            then beat on high speed for 3 minutes. Make sure that you don't get
            your fingers caught in the beaters. Pour mixture into tin and bake
            in a moderate oven for 30-40 minutes. This is a good time to start
            cleaning up the mess, you might even enjoy licking the beaters!!!
            When cold ice with icing of choice and sprinkle with coconut or
            icing sugar.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="step1"
              className="block text-gray-700 font-medium mb-2 underline"
            >
              STEP 1:
            </label>
            <input
              type="text"
              id="step1"
              value={formData.question3.step1}
              onChange={(e) =>
                handleInputChange("question3", "step1", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="step2"
              className="block text-gray-700 font-medium mb-2 underline"
            >
              STEP 2:
            </label>
            <input
              type="text"
              id="step2"
              value={formData.question3.step2}
              onChange={(e) =>
                handleInputChange("question3", "step2", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="step3"
              className="block text-gray-700 font-medium mb-2 underline"
            >
              STEP 3:
            </label>
            <input
              type="text"
              id="step3"
              value={formData.question3.step3}
              onChange={(e) =>
                handleInputChange("question3", "step3", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="step4"
              className="block text-gray-700 font-medium mb-2 underline"
            >
              STEP 4:
            </label>
            <input
              type="text"
              id="step4"
              value={formData.question3.step4}
              onChange={(e) =>
                handleInputChange("question3", "step4", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="step5"
              className="block text-gray-700 font-medium mb-2 underline"
            >
              STEP 5:
            </label>
            <input
              type="text"
              id="step5"
              value={formData.question3.step5}
              onChange={(e) =>
                handleInputChange("question3", "step5", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Question 4 Component
const Question4 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Language and Literacy
      </h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 4:
        </h4>
        <p className="mb-4">
          Read the following text and answer the questions below:
        </p>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-6">
          <p className="italic mb-4">
            "Cats is a musical composed by Andrew Lloyd Webber, based on Old
            Possum's Book of Practical Cats by T. S. Eliot, and produced by
            Cameron Mackintosh. The musical tells the story of a tribe of cats
            called the Jellicles and the night they make what is known as "the
            Jellicle choice" and decide which cat will ascend to the Heaviside
            Layer and come back to a new life. Cats introduced the song standard
            "Memory". The first performance of Cats was in 1981."
          </p>
          <p className="italic">
            Andrew Lloyd Webber, Baron Lloyd-Webber [2][3] (born 22 March 1948)
            is an English composer and impresario of musical theatre.[4] Several
            of his musicals have run for more than a decade both in the West End
            and on Broadway. He has composed 13 musicals, a song cycle, a set of
            variations, two film scores, and a Latin Requiem Mass. Several of
            his songs have been widely recorded and were hits outside of their
            parent musicals, notably "The Music of the Night" from The Phantom
            of the Opera, "I Don't Know How to Love Him" from Jesus Christ
            Superstar, "Don't Cry for Me, Argentina" and "You Must Love Me" from
            Evita, "Any Dream Will Do" from Joseph and the Amazing Technicolor
            Dreamcoat and "Memory" from Cats. In 2001 the New York Times
            referred to him as "the most commercially successful composer in
            history".[5] Ranked the "fifth most powerful person in British
            culture" by The Telegraph in 2008, the lyricist Don Black stated,
            "Andrew more or less single-handedly reinvented the musical."
            (https://en.wikipedia.org/wiki/Andrew_Lloyd_Webber)
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="q4a"
              className="block text-gray-700 font-medium mb-2"
            >
              a. Who composed the Cats musical?
            </label>
            <input
              type="text"
              id="q4a"
              value={formData.question4.a}
              onChange={(e) =>
                handleInputChange("question4", "a", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q4b"
              className="block text-gray-700 font-medium mb-2"
            >
              b. In which year was the first Cats performance?
            </label>
            <input
              type="text"
              id="q4b"
              value={formData.question4.b}
              onChange={(e) =>
                handleInputChange("question4", "b", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q4c"
              className="block text-gray-700 font-medium mb-2"
            >
              c. What is the Cats musical about?
            </label>
            <input
              type="text"
              id="q4c"
              value={formData.question4.c}
              onChange={(e) =>
                handleInputChange("question4", "c", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q4d"
              className="block text-gray-700 font-medium mb-2"
            >
              d. Name 3 other musicals by the same writer.
            </label>
            <input
              type="text"
              id="q4d"
              value={formData.question4.d}
              onChange={(e) =>
                handleInputChange("question4", "d", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q4e"
              className="block text-gray-700 font-medium mb-2"
            >
              e. How did the New York Times refer to Andrew Lloyd Webber?
            </label>
            <input
              type="text"
              id="q4e"
              value={formData.question4.e}
              onChange={(e) =>
                handleInputChange("question4", "e", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Question 5 Component
const Question5 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Numeracy</h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 5:
        </h4>
        <p className="mb-4">
          Julie works full time. She earns $550 per week for a 5-day week.
        </p>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="q5a"
              className="block text-gray-700 font-medium mb-2"
            >
              a. How much does Julie earn each day?
            </label>
            <input
              type="text"
              id="q5a"
              value={formData.question5.a}
              onChange={(e) =>
                handleInputChange("question5", "a", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q5b"
              className="block text-gray-700 font-medium mb-2"
            >
              b. How much does she earn in one year?
            </label>
            <input
              type="text"
              id="q5b"
              value={formData.question5.b}
              onChange={(e) =>
                handleInputChange("question5", "b", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q5c"
              className="block text-gray-700 font-medium mb-2"
            >
              c. Julie doesn't pay tax for the first $18,000 she earns. She then
              pays 20 cents for every dollar she earns above $18,000. How much
              tax will Julie pay in the year?
            </label>
            <input
              type="text"
              id="q5c"
              value={formData.question5.c}
              onChange={(e) =>
                handleInputChange("question5", "c", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q5d"
              className="block text-gray-700 font-medium mb-2"
            >
              d. Julie just received a pay rise of $700. She will remain in the
              same tax bracket. How much will she keep of the $700 and how much
              will she pay in tax?
            </label>
            <input
              type="text"
              id="q5d"
              value={formData.question5.d}
              onChange={(e) =>
                handleInputChange("question5", "d", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Question 6 Component
const Question6 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Numeracy</h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 6:
        </h4>
        <p className="mb-4">
          Hannah wants to buy four 1.5 litre bottles of mineral water. Each
          bottle is $3.00. Hannah can purchase them in a packet of 5 for $10.60.
        </p>
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center text-blue-500"
              >
                <span className="text-xs">Bottle</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="q6a"
              className="block text-gray-700 font-medium mb-2"
            >
              a. How much will the four bottles cost in total if Hannah
              purchases 4 individually?
            </label>
            <input
              type="text"
              id="q6a"
              value={formData.question6.a}
              onChange={(e) =>
                handleInputChange("question6", "a", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q6b"
              className="block text-gray-700 font-medium mb-2"
            >
              b. How much will each bottle cost if Hannah purchases them in a
              pack of 5?
            </label>
            <input
              type="text"
              id="q6b"
              value={formData.question6.b}
              onChange={(e) =>
                handleInputChange("question6", "b", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="q6c"
              className="block text-gray-700 font-medium mb-2"
            >
              c. How much per litre is Hannah paying if she purchases the 4
              bottles individually?
            </label>
            <input
              type="text"
              id="q6c"
              value={formData.question6.c}
              onChange={(e) =>
                handleInputChange("question6", "c", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Question 7 Component
// Question 8 Component
const Question8 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Numeracy</h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 8:
        </h4>
        <p className="mb-4">Answer the following calculations.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">3² =</label>
            <input
              type="text"
              value={formData.question8.power1}
              onChange={(e) =>
                handleInputChange("question8", "power1", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">2³ =</label>
            <input
              type="text"
              value={formData.question8.power2}
              onChange={(e) =>
                handleInputChange("question8", "power2", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              4:3 = 12:
            </label>
            <input
              type="text"
              value={formData.question8.ratio}
              onChange={(e) =>
                handleInputChange("question8", "ratio", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              -7 x 3 =
            </label>
            <input
              type="text"
              value={formData.question8.multiplication}
              onChange={(e) =>
                handleInputChange("question8", "multiplication", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              144 / 6 =
            </label>
            <input
              type="text"
              value={formData.question8.division}
              onChange={(e) =>
                handleInputChange("question8", "division", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ¾ = %
            </label>
            <input
              type="text"
              value={formData.question8.fractionToPercentage}
              onChange={(e) =>
                handleInputChange(
                  "question8",
                  "fractionToPercentage",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fix Question 7 component (was incorrectly defined in original code)
const Question7 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Numeracy</h3>
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Question 7:
        </h4>
        <p className="mb-4">
          Bob is flying to Los Angeles from Melbourne. The flight is
          approximately 15 hours. Bob leaves Melbourne at 7am on the 15th of
          February. Los Angeles is 19 hours behind Melbourne time. What time and
          date will it be in Los Angeles when the plane lands?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Time:
            </label>
            <input
              type="text"
              value={formData.question7.time}
              onChange={(e) =>
                handleInputChange("question7", "time", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date:
            </label>
            <input
              type="text"
              value={formData.question7.date}
              onChange={(e) =>
                handleInputChange("question7", "date", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LLNAssessment;
