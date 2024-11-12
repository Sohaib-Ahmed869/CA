import React, { useState, useEffect } from "react";
import {
  createIndustry,
  addCertificateToIndustry,
  getIndustries,
} from "../../Customer/Services/adminServices";
import cert from "../../assets/cert.png";
import { Table } from "flowbite-react";
import SpinnerLoader from "../../Customer/components/spinnerLoader";

const Industries = () => {
  //show industries, modal to add industry, modal to add certificate to industry
  const [industries, setIndustries] = useState([]);
  const [industry, setIndustry] = useState("");
  const [industryDescription, setIndustryDescription] = useState("");
  const [qualification, setQualification] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [viewAllCertificates, setViewAllCertificates] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCertificates, setSelectedCertificates] = useState("");
  const [IndustryId, setIndustryId] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const fetchIndustries = async () => {
    setSubmissionLoading(true);
    try {
      const response = await getIndustries();
      console.log(response.industries);
      setIndustries(response.industries);
      setSubmissionLoading(false);
    } catch (err) {
      console.log(err);
      setSubmissionLoading(false);
    }
    setSubmissionLoading(false);
  };

  useEffect(() => {
    fetchIndustries();
  }, [showModal, showCertificateModal]);

  const handleAddIndustry = async () => {
    const response = await createIndustry({
      name: industry,
      description: industryDescription,
    });
    if (response) {
      fetchIndustries();
      setIndustry("");
      setIndustryDescription("");
      setShowModal(false);
    }
  };

  const handleAddCertificate = async () => {
    const response = await addCertificateToIndustry({
      industry: IndustryId,
      qualification,
      price,
      type,
    });
    if (response) {
      fetchIndustries();
      setQualification("");
      setPrice("");
      setType("");
      setShowCertificateModal(false);
    }
  };

  return (
    <div className="p-10">
      {submissionLoading && <SpinnerLoader />}
      <div className="flex flex-row items-center mb-10 justify-between">
        <div className="flex flex-row items-center mb-5 gap-2">
          <img src={cert} alt="cert" className="h-36" />
          <div>
            <h1 className="text-2xl font-bold">Industries</h1>
            <p className="text-gray-500">
              Add industries and certificates to industries
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mb-5 gap-5 justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary text-white"
          >
            Add Industry
          </button>
          <button
            onClick={() => setShowCertificateModal(true)}
            className="btn btn-primary text-white"
          >
            Add Certificate
          </button>
        </div>
      </div>
      <Table className="table mx-auto max-sm:max-w-screen-sm sm:overflow-x-auto text-black text-md">
        <thead>
          <tr className=" table-row bg-gray-200">
            <th className="table-cell font-semibold p-5 max-sm:min-w-40">
              Industry
            </th>
            <th className="table-cell font-semibold p-5 max-sm:min-w-40">
              Description
            </th>
            <th className="table-cell font-semibold p-5 max-sm:min-w-40">
              Certificates
            </th>
          </tr>
        </thead>
        <tbody>
          {industries.map((industry) => (
            <tr key={industry._id}>
              <td>{industry.name}</td>
              <td>{industry.description}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedIndustry(industry._id);
                    setSelectedCertificates(industry.certifications);
                    setViewAllCertificates(true);
                    console.log(industry.certifications);
                  }}
                  className="text-blue-700 underline"
                >
                  View Certificates
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Add Industry Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Industry</h3>
            <input
              type="text"
              placeholder="Industry"
              className="input input-bordered w-full mb-2"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="input input-bordered w-full mb-2"
              value={industryDescription}
              onChange={(e) => setIndustryDescription(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddIndustry}>
                Add Industry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {showCertificateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Certificate</h3>
            <select
              className="select select-bordered w-full mb-2"
              value={industry.id}
              onChange={(e) => setIndustryId(e.target.value)}
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Qualification"
              className="input input-bordered w-full mb-2"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              className="input input-bordered w-full mb-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              className="select select-bordered w-full mb-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="aes">aes</option>
              <option value="educube">educube</option>
              <option value="default">default</option>
            </select>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowCertificateModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddCertificate}
              >
                Add Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Certificates Modal */}
      {viewAllCertificates && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Certificates</h3>
            <Table className="table w-full p-2">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Price</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {selectedCertificates.length > 0 &&
                  selectedCertificates.map((certificate) => (
                    <tr key={certificate._id}>
                      <td>{certificate.qualification}</td>
                      <td>{certificate.price}</td>
                      <td>{certificate.type}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setViewAllCertificates(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industries;
