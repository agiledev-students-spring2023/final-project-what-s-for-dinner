const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const fs = require("fs");
const path = require("path");

chai.use(chaiHttp);
const { expect } = chai;

describe("Utensils API", () => {
  it("should return a list of utensils on /utensils GET", (done) => {
    chai
      .request(server)
      .get("/utensils")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        
        const utensilsFilePath = path.join(__dirname, '../tmp_data/utensils.txt');
        const fileContent = fs.readFileSync(utensilsFilePath, "utf-8");
        const expectedUtensils = fileContent.split("\n").map((line) => {
          try {
            const { id, utensil_title, image_url } = JSON.parse(line);
            return { id, utensil_title, image_url };
          } catch (error) {
            console.error(`Error parsing utensil: ${line}`, error);
            return null;
          }
        }).filter(utensil => utensil !== null);

        expect(res.body).to.deep.equal(expectedUtensils);
        done();
      });
  });
});
