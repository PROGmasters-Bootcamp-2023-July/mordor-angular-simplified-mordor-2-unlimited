package hu.progmasters.mordor.domain.dto;

import hu.progmasters.mordor.domain.WeaponType;

import java.util.List;

public class OrcFormModify {

    private String name;

    private String raceType;

    private Long killCount;

    private List<WeaponType> weapons;

    public OrcFormModify() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRaceType() {
        return raceType;
    }

    public void setRaceType(String raceType) {
        this.raceType = raceType;
    }

    public Long getKillCount() {
        return killCount;
    }

    public void setKillCount(Long killCount) {
        this.killCount = killCount;
    }

    public List<WeaponType> getWeapons() {
        return weapons;
    }

    public void setWeapons(List<WeaponType> weapons) {
        this.weapons = weapons;
    }
}
