<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/catalogo">
    <div class="catalog-grid">
        <xsl:apply-templates select="jugador"/>
    </div>
</xsl:template>

<xsl:template match="jugador">
    <article class="player-card">
        <div class="player-card__header">
            <h3><xsl:value-of select="nombre"/></h3>
            <span class="player-card__position"><xsl:value-of select="posicion"/></span>
        </div>
        <dl class="player-card__stats">
            <div>
                <dt>Equipo</dt>
                <dd><xsl:value-of select="equipo"/></dd>
            </div>
            <div>
                <dt>Era</dt>
                <dd><xsl:value-of select="era"/></dd>
            </div>
            <div>
                <dt>Jonrones</dt>
                <dd><xsl:value-of select="jonrones"/></dd>
            </div>
            <div>
                <dt>Promedio</dt>
                <dd><xsl:value-of select="promedio"/></dd>
            </div>
        </dl>
        <p class="player-card__desc"><xsl:value-of select="descripcion"/></p>
    </article>
</xsl:template>

</xsl:stylesheet>
