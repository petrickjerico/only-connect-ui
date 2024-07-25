import { Select, Option } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import languages from '../../../../assets/translations.json'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'

export default function LanguageSelection() {
  const { i18n } = useTranslation()

  const changeLanguage = (
    event: React.SyntheticEvent | null,
    value: string | null
  ) => {
    i18n.changeLanguage(value ?? i18n.language)
  }

  return (

    <Select
      defaultValue={i18n.resolvedLanguage}
      onChange={changeLanguage}
      variant='soft'
      startDecorator={<LanguageRoundedIcon />}
      sx={{
        width: 'fit-content'
      }}
    >
      {Object.entries(languages).map(([lang, { display }]) =>
        <Option value={lang} key={lang} >
          {display}
        </Option>
      )}
    </Select>
  )
}