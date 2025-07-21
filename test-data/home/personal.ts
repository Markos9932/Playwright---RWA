export interface PersonalTestData {
  numberOfTransaction: string;
  amountOfTransaction: string;
  userFirstAndLastName: string;
  transPartner: string;
  transPartner1: string;
  amountSlider: string;
}

const personalTestData: PersonalTestData = {
  numberOfTransaction: "0",
  amountOfTransaction: "$456.00",
  userFirstAndLastName: "arbitrary user",
  transPartner: "Kristian Bradtke",
  transPartner1: "Ted Parisian",
  amountSlider: "322"
};

export default personalTestData;