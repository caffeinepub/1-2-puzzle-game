import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Migration "migration";
import MixinStorage "blob-storage/Mixin";

(with migration = Migration.run)
actor {
  include MixinStorage();

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

  let services = Map.empty<Text, Service>();
  let staff = Map.empty<Text, StaffMember>();
  let appointments = List.empty<AppointmentRequest>();

  var businessHours : ?BusinessHours = null;
  var contactInfo : ?ContactInfo = null;

  public shared ({ caller }) func addService(name : Text, description : Text, price : Nat, durationMinutes : Nat) : async () {
    let service = {
      name;
      description;
      price;
      durationMinutes;
    };
    services.add(name, service);
  };

  public shared ({ caller }) func addStaffMember(name : Text, role : Text, bio : Text, photoUrl : Text) : async () {
    let staffMember = {
      name;
      role;
      bio;
      photoUrl;
    };
    staff.add(name, staffMember);
  };

  public shared ({ caller }) func setBusinessHours(monday : Text, tuesday : Text, wednesday : Text, thursday : Text, friday : Text, saturday : Text, sunday : Text) : async () {
    businessHours := ?{
      monday;
      tuesday;
      wednesday;
      thursday;
      friday;
      saturday;
      sunday;
    };
  };

  public shared ({ caller }) func setContactInfo(address : Text, phone : Text, email : Text) : async () {
    contactInfo := ?{
      address;
      phone;
      email;
    };
  };

  public query ({ caller }) func getServices() : async [Service] {
    services.values().toArray();
  };

  public query ({ caller }) func getStaff() : async [StaffMember] {
    staff.values().toArray();
  };

  public query ({ caller }) func getBusinessHours() : async ?BusinessHours {
    businessHours;
  };

  public query ({ caller }) func getContactInfo() : async ?ContactInfo {
    contactInfo;
  };

  public shared ({ caller }) func submitAppointmentRequest(name : Text, phone : Text, preferredDateTime : Text, service : Text) : async () {
    let appointment = {
      name;
      phone;
      preferredDateTime;
      service;
      submittedAt = 0;
    };
    appointments.add(appointment);
  };

  public query ({ caller }) func getAppointmentRequests() : async [AppointmentRequest] {
    appointments.toArray();
  };
};
