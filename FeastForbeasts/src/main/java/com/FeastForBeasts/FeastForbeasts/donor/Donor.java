package com.FeastForBeasts.FeastForbeasts.donor;

@Entity
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String contactInfo;
    private String location;

    public Donor() {
    }

    @JsonIgnore // Prevents recursive issues in JSON responses
    @OneToMany(mappedBy = "donor") // One Donor has Many Food Donations
    private List<FoodDonation> foodDonations;

    @JsonIgnore
    @OneToMany(mappedBy = "foodDonation")
    private List<Animal> animals; // Indirect relation (via food donations)

    public Donor(Long id, String name, String contactInfo, String location) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<FoodDonation> getFoodDonations() {
        return foodDonations;
    }

    public void setFoodDonations(List<FoodDonation> foodDonations) {
        this.foodDonations = foodDonations;
    }

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
    }
}
