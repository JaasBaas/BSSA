using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class MeasureUnit
    {
        public string MeasureUnitDisplay
        {
            get
            {
                if (this.MeasureUnitName == this.MeasureUnitAbbr)
                    return this.MeasureUnitName;
                else
                    return string.Format("{0} ({1})", this.MeasureUnitAbbr, this.MeasureUnitName);
            }
        }
    }
}
