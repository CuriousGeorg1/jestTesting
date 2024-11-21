import fs from "fs";
import { getEmployeeContactInfo, getEmployees } from "./employeeService";
import { ContactInformation, Employee } from "../interface";

// Mock the fs module
jest.mock("fs");

describe("File Service Tests", () => {
  const mockEmployees: Employee[] = [
    { id: "1", firstName: "John", lastName: "Doe", jobTile: "Developer" },
    { id: "2", firstName: "Jane", lastName: "Smith", jobTile: "Designer" },
  ];

  const mockContactInfos : ContactInformation[] = [
    {
      id: "1",
      employeeId: "1",
      email: "jaakko123@mail.com",
      mobile: "040643204390",
      address: "Jykintie 43"
    },
    {
      id: "2",
      employeeId: "2",
      email: "konsta3935@mail.com",
      mobile: "0506490664",
      address: "Kangasmoisionkatu 8"
    }
  ]

  beforeEach(() => {
    // Clear the mocks before each test
    jest.clearAllMocks();
  });

  describe("getEmployees", () => {
    it("should return a list of employees", () => {
      // Mock the file reading behavior for employees.json
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockEmployees)
      );

      const employees = getEmployees();

      // Check if the returned value matches the mock data
      expect(employees).toEqual(mockEmployees);
      expect(fs.readFileSync).toHaveBeenCalledWith("./data/employees.json");
    });

    it("should throw an error if employee file is unreadable", () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("Test Error")
      });
      expect(() => getEmployees()).toThrow("Test Error");
    });
  });

  describe("getEmployeeContactInfo", () => {
    it("should return contact information for a given employee ID", () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockContactInfos)
      );

      const contactInfo = getEmployeeContactInfo("2")

      expect(contactInfo).toEqual(mockContactInfos[1]);
      expect(fs.readFileSync).toHaveBeenCalledWith("./data/contactinfo.json");
    });

    it("should return undefined if employee ID is not found", () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockContactInfos)
      );

      const contactInfo = getEmployeeContactInfo("3");
      expect(contactInfo).toBeUndefined();
    });

    it("should throw an error if contact info file is unreadable", () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("Test Error")
      });
      expect(() => getEmployeeContactInfo("1")).toThrow("Test Error");
    });
  });
});
