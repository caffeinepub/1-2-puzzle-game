import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Service = {
    name : Text;
    description : Text;
    price : Nat;
    durationMinutes : Nat;
  };

  type StaffMember = {
    name : Text;
    role : Text;
    bio : Text;
    photoUrl : Text;
  };

  type BusinessHours = {
    monday : Text;
    tuesday : Text;
    wednesday : Text;
    thursday : Text;
    friday : Text;
    saturday : Text;
    sunday : Text;
  };

  type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
  };

  type AppointmentRequest = {
    name : Text;
    phone : Text;
    preferredDateTime : Text;
    service : Text;
    submittedAt : Int;
  };

  type OldScoreEntry = {
    playerName : Text;
    moveCount : Nat;
    timeInSeconds : Nat;
    timestamp : Int;
  };

  type OldActor = {
    scoresList : List.List<OldScoreEntry>;
  };

  type NewActor = {
    services : Map.Map<Text, Service>;
    staff : Map.Map<Text, StaffMember>;
    appointments : List.List<AppointmentRequest>;
    businessHours : ?BusinessHours;
    contactInfo : ?ContactInfo;
  };

  public func run(old : OldActor) : NewActor {
    {
      services = Map.empty<Text, Service>();
      staff = Map.empty<Text, StaffMember>();
      appointments = List.empty<AppointmentRequest>();
      businessHours = null;
      contactInfo = null;
    };
  };
};
